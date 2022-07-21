import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { Location } from '@angular/common'

import { AuthService, IUser } from '../services';

import { LogEntry } from './DetailsFormClasses';

declare let $: any;

@Component({
    selector: 'app-details-form',
    templateUrl: './details-form.component.html',
    styles: [
        '#name-value-size { padding: .67857143em 1em; }',
        '#name-input-field { padding: .67857143em 1em !important; width:100%; }'
    ]
})
export class DetailsFormComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() sourceClass: string;
    @Input() formValues: {};
    @Input() formElements: any[];
    @Input() saveResponse: {};
    @Output() formSaved = new EventEmitter<any>();

    @ViewChild('detailform') detailform: NgForm;

    user: IUser;

    form: FormGroup;
    nameField = false;
    selectedTab: number;

    backButtonOptions: any;
    refreshButtonOptions: any;
    selectBoxOptions: any;
    saveButtonOptions: any;

    constructor(
        private _location: Location,
        private _fb: FormBuilder,
        private _authService: AuthService
    ) {
        this.backButtonOptions = {
            type: 'back',
            onClick: () => {
                this._location.back()
            },
        };

        this.refreshButtonOptions = {
            icon: 'refresh',
            onClick: () => {
                console.log('refresh')
            },
        };

        this.saveButtonOptions = {
            icon: 'save',
            type: 'success',
            onClick: () => {
                this.detailform.onSubmit(undefined);
            },
        };

    }

    async ngOnInit() {
        await this._authService.getUser().then((e) => this.user = e.data);
        this.buildReactiveForm();
        this.patchFormValues();

        this.selectedTab = this.formElements[0].id;

        this.selectBoxOptions = {
            width: 'auto',
            items: this.formElements,
            valueExpr: 'id',
            displayExpr: 'title',
            value: this.formElements[0].id,
            onValueChanged: (args) => {
              this.selectedTab = args.value;
            },
          };
    }

    ngAfterViewInit(): void {
        $('.secondary.menu .item').tab({context: 'parent'});
        $('.notes.menu .item').tab();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!changes.formValues.firstChange) {
            this.updateLogAndNotes();
            this.form.markAsPristine();
        }
    }

    buildReactiveForm(): void {
        const controls = {};

        controls['name'] = null;

        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                controls[field.column_name] = null;
            });
        });

        this.form = this._fb.group(controls);
    }

    patchFormValues(): void {
        const values = {};

        values['name'] = this.formValues['name'];

        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                if (this.logOrNotes(field.type)) {
                    this.buildFormArrays(field);
                } else {
                    values[field.column_name] = this.formatInputValues(field.type, this.formValues[field.column_name]);
                }
            });
        });

        this.form.patchValue(values);
    }

    buildFormArrays(field): void {
        const control = field.column_name;
        const fieldId = field.id;
        let newLogEntry: LogEntry;
        const formGroups = [];

        // Init new LogEntry.
        if (field.type === 'notes') {
            const user = this.user?.id;
            const today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            newLogEntry = new LogEntry(this.sourceClass, this.formValues['id'], fieldId, user, date);
        } else {
            newLogEntry = new LogEntry(this.sourceClass, this.formValues['id'], fieldId);
        }

        // Push new LogEntry to FormGroup array.
        formGroups.push(this._fb.group(newLogEntry));

        // Set existing Log Entries.
        if (this.formValues[control]) {
            this.formValues[control].map(logEntry => {
                const formGroup = this.formatFormGroup(field, logEntry);
                formGroups.push(formGroup);
            });
        }

        const formArray = this._fb.array(formGroups);
        this.form.setControl(control, formArray);
    }

    save(): void {
        if (this.form.dirty && this.form.valid) {
            const body = this.extractUpdatedFields();
            this.formSaved.emit(body);
        }
    }

    private extractUpdatedFields() {
        const updatedValues = <any>{};

        updatedValues.id = this.formValues['id'];

        if (!this.form.get('name').pristine) {
            updatedValues.name = this.form.get('name').value;
        }

        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                const formControl = this.form.get(field.column_name);
                // Only add updated custom_fields to updatedValues array.
                if (!formControl.pristine) {
                    if (this.logOrNotes(field.type)) {
                        const formArray = this.getLogEntryFA(field.column_name);
                        const logArray = [];

                        for (let i = 0; i < formArray.controls.length; i++) {
                            // Only Update log entries that are not pristine.
                            if (!formArray.controls[i].pristine) {
                                const logEntry = formArray.controls[i].value;

                                if (field.type === 'log') {
                                    field.columns.forEach(column => {
                                        if (column.type === 'select_multiple') {
                                            logEntry[column.column_name] = JSON.stringify(logEntry[column.column_name]);
                                        }
                                    });
                                }

                                logArray.push(logEntry);
                            }
                        }

                        updatedValues[field.column_name] = logArray;
                    } else if (field.type === 'select_multiple') {
                        // Stringify select multiple array.
                        updatedValues[field.column_name] = JSON.stringify(formControl.value);
                    } else {
                        updatedValues[field.column_name] = formControl.value;
                    }
                }
            });
        });

        return updatedValues;
    }

    private formatFormGroup(field, logEntry): FormGroup {
        const patchValues = [];
        field.columns.forEach(column => {
            patchValues[column.column_name] = this.formatInputValues(column.type, logEntry[column.column_name]);
            logEntry[column.column_name] = null;
        });

        logEntry['deleted'] = null;

        const formGroup = this._fb.group(logEntry);
        formGroup.patchValue(patchValues);

        return formGroup;
    }

    private formatInputValues(type, value): any {
        if (type === 'select_multiple') {
            return JSON.parse(value);
        } else if (type === 'checkbox') {
            return (value === '1') ? true : false;
        } else {
            return value;
        }
    }

    private updateLogAndNotes(): void {
        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                if (this.logOrNotes(field.type)) {
                    // Rebuild Form Arrays when new log entry create or log entry deleted.
                    if (!this.newLogEntryPristine(field.column_name) || this.logEntryDeleted(field.column_name)) {
                        this.buildFormArrays(field);
                    }
                }
            });
        });
    }

    private logEntryDeleted(control): boolean {
        const logEntryFA = this.getLogEntryFA(control);
        if (logEntryFA.pristine) {
            return false;
        }

        const logEntryFGs = logEntryFA.value;

        for (let i = 0; i < logEntryFGs.length; i++) {
            if (logEntryFGs[i]['deleted'] === true) {
                return true;
            }
        }

        return false;
    }

    private newLogEntryPristine(control): boolean {
        const logEntryFA = this.getLogEntryFA(control);
        const newLogEntry = logEntryFA.controls[0];

        return newLogEntry.pristine;
    }

    private getLogEntryFA(control): FormArray {
        return this.form.get(control) as FormArray;
    }

    private logOrNotes(type): boolean {
        return type === 'log' || type === 'notes';
    }

}
