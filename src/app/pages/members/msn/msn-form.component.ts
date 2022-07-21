import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthService, IUser } from '../../../shared/services';

import { LogEntry } from '../../../shared/DetailsForm/DetailsFormClasses';

declare let $: any;

class Field {
    id: number;
    title: string;
    type: string;
    column_name: string;
    options: any[];

    constructor(id, title, type, column_name, options) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.column_name = column_name;
        this.options = options;
    }
}

@Component({
    selector: 'app-msn-form',
    templateUrl: './msn-form.component.html'
})
export class MSNFormComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() submitStatus: boolean;
    @Input() formElements: any[];
    @Input() shops: any[];
    @Input() saveMessage: string;
    @Output() formSaved = new EventEmitter<any>();

    user: IUser;

    form: FormGroup;

    selectedShops: any[];
    shopsField: Field;

    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService
    ) {}

    async ngOnInit() {
        await this._authService.getUser().then((e) => this.user = e.data);
        this.buildReactiveForm();
        this.patchFormValues();

        this.shopsField = new Field(
            0,
            'Select Shops',
            'select_multiple',
            'shops_selection',
            this.shops
        );

        this.selectedShops = null;
    }

    ngAfterViewInit(): void {
        $('.notes.menu .item').tab();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.submitStatus && this.submitStatus === true) {
            this.form.reset();

            $('.dropdown').dropdown('clear');
            this.selectedShops = null;

            this.patchFormValues();
        }
    }

    buildReactiveForm(): void {
        const controls = {};

        this.formElements.forEach(field => {
            controls[field.column_name] = null;
        });

        controls['shops_selection'] = null;

        this.form = this._fb.group(controls);
    }

    patchFormValues(): void {
        this.formElements.forEach(field => {
            this.buildFormArrays(field);
        });

        this.form.patchValue({shops_selection: this.selectedShops});

        this.form.controls['shops_selection'].setValidators([Validators.required]);
    }

    buildFormArrays(field): void {
        const control = field.column_name;
        const fieldId = field.id;
        let newLogEntry: LogEntry;
        const formGroups = [];

        // Init new LogEntry.
        const user = this.user.id;
        const today = new Date();
        const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        newLogEntry = new LogEntry('Shop', null, fieldId, user, date);

        // Push new LogEntry to FormGroup array.
        formGroups.push(this._fb.group(newLogEntry));

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
        const msn = <any>{};
        const notesArray = [];

        this.formElements.forEach(field => {
            const formControl = this.form.get(field.column_name);

            // Only add updated custom_fields to updatedValues array.
            if (!formControl.pristine) {
                const formArray = this.form.get(field.column_name) as FormArray;

                if (!formArray.controls[0].pristine) {
                    const logEntry = formArray.controls[0].value;
                    notesArray.push(logEntry);
                }
            }
        });

        msn['notes'] = notesArray;

        // get shops array
        const shopsFormControl = this.form.get('shops_selection');
        msn['shops'] = JSON.stringify(shopsFormControl.value);

        return msn;
    }
}
