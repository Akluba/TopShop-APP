import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from '../core/auth.service';

declare let $: any;

class LogEntry {
    id = 0;
    source_class = 'Shop';
    source_id: number;
    field_id: number;
    log_field1: string = null;
    log_field2: string = null;
    log_field3: string = null;
    log_field4: string = null;
    log_field5: string = null;
    log_field6: string = null;
    log_field7: string = null;
    log_field8: string = null;
    log_field9: string = null;
    log_field10: string = null;

    constructor(source_id, field_id, log_field1?, log_field2?) {
        this.source_id  = source_id;
        this.field_id   = field_id;
        this.log_field1 = log_field1;
        this.log_field2 = log_field2;
    }
}

@Component({
    selector: 'app-details-form',
    templateUrl: './details-form.component.html'
})
export class DetailsFormComponent implements OnInit {
    @Input() formValues: {};
    @Input() formElements: any[];

    form: FormGroup;
    nameField = false;

    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService
    ) {}

    ngOnInit(): void {
        this.buildReactiveForm();
        this.patchFormValues();
    }

    ngAfterViewInit(): void {
        $('.secondary.menu .item').tab({context: 'parent'});
        $('.notes.menu .item').tab();
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
            const user = this._authService.currentUser.id;
            const today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            newLogEntry = new LogEntry(this.formValues['id'], fieldId, user, date);
        } else {
            newLogEntry = new LogEntry(this.formValues['id'], fieldId);
        }

        // Push new LogEntry to FormGroup array.
        formGroups.push(this._fb.group(newLogEntry));

        // Set existing Log Entries.
        if (this.formValues[control]) {
            this.formValues[control].map(logEntry => {
                formGroups.push(this.formatFormGroup(field, logEntry));
            });
        }

        const formArray = this._fb.array(formGroups);
        this.form.setControl(control, formArray);
    }

    private formatFormGroup(field, logEntry): FormGroup {
        field.columns.forEach(column => {
            logEntry[column.column_name] = this.formatInputValues(column.type, logEntry[column.column_name]);
        });

        logEntry['deleted'] = null;

        return this._fb.group(logEntry);
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

    private logOrNotes(type): boolean {
        return type === 'log' || type === 'notes';
    }

}
