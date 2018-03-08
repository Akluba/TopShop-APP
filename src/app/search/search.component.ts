import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    searchStep = 1;
    searchableFields: {};
    searchGroups: any[];
    selectedField: {field: {}, group: string};
    fieldForm: FormGroup;
    loading: boolean;
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.searchableFields = data.response.fields;
            this.searchGroups = Object.keys(this.searchableFields);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    resetSearch(): void {
        if (confirm('Navigating back to this step will reset the search, do you wish to continue?')) {
            delete this.selectedField;
            delete this.fieldForm;
            this.searchStep = 1;
        }
    }

    save(): void {
        this.searchStep = 3;
        this.loading = true;
        console.log(this.fieldForm.value);
    }

    buildFieldForm(): void {
        if (!this.fieldForm) {
            const field = this.selectedField.field;
            const group = this.selectedField.group;
            const controls = [];

            // Set field control and build main FormGroup.
            controls[field['id']] = null;
            this.fieldForm = this._fb.group(controls);

            const control = field['id'];
            const formGroup = [];

            // Set FormGroup containing field columns.
            formGroup.push(this.buildFormGroup(field['columns']));

            // Set field control to FormArray containing field column controls.
            const formArray = this._fb.array(formGroup);
            this.fieldForm.setControl(control, formArray);
        }
    }

    buildFormGroup(columns): FormGroup {
        const formGroup = [];

        columns.forEach(column => {
            formGroup[column.column_name] = null;
        });

        return this._fb.group(formGroup);
    }
}

