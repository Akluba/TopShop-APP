import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SearchService } from './search.service';
import { SearchStep } from './search-classes';

@Component({
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    sourceClass: string;
    searchableFields: {};
    searchGroups: any[];
    searchSteps: SearchStep[];
    searchStep: number;
    selectedField: number;
    fieldElements: {};
    fieldForm: FormGroup;
    searchResponse: any[];

    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _fb: FormBuilder, private _searchService: SearchService) {}

    ngOnInit(): void {
        this.searchSteps = [
            new SearchStep('resetSearch', 'search icon', 'Field Options', 'Select a field to search.'),
            new SearchStep('getField', 'filter icon', 'Filter Values', 'Enter values you wish to filter.'),
            new SearchStep('save', 'list icon', 'Results'),
        ];

        this.sub = this._route.data.subscribe(data => {
            this.resetSearch(true);
            this.sourceClass = this._route.snapshot.params['source_class'];
            this.searchableFields = data.response.fields;
            this.searchGroups = Object.keys(this.searchableFields);
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    resetSearch(autoRefresh?): void {
        if (autoRefresh || confirm('Navigating back to this step will reset the search, do you wish to continue?')) {
            delete this.selectedField;
            delete this.fieldForm;
            delete this.searchResponse;

            this.updateStepStatus(0);
        }
    }

    updateStepStatus(newStepIndex?): void {
        if (newStepIndex !== undefined) {
            this.searchStep = newStepIndex;
        }

        const stepStatusConditions = [
            { 'disabled': !!this.fieldForm, 'completed': !!this.fieldForm },
            { 'disabled': !this.selectedField || !!this.searchResponse, 'completed': !!this.searchResponse },
            { 'disabled': !this.fieldForm, 'completed': false }
        ];

        for (let i = 0; i < this.searchSteps.length; i++) {
            const active = this.searchStep === i;
            const disabled = stepStatusConditions[i].disabled;
            const completed = stepStatusConditions[i].completed;

            this.searchSteps[i].updateStatus(active, disabled, completed);
        }
    }

    getField(): void {
        this.searchSteps[1].toggleLoading();

        const field = this.selectedField;
        this._searchService.show(field)
            .subscribe(res => {
                this.fieldElements = res.field;
                this.buildFieldForm(res.field);

                this.searchSteps[1].toggleLoading();
                this.updateStepStatus(1);
            });
    }

    buildFieldForm(field): void {
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

    buildFormGroup(columns): FormGroup {
        const formGroup = [];

        columns.forEach(column => {
            formGroup[column.column_name] = null;
        });

        return this._fb.group(formGroup);
    }

    save(): void {
        const step = 2;
        this.searchSteps[step].toggleLoading();

        const body = {
            'source_class': this.sourceClass,
            'filters': this.fieldForm.value
        };

        this._searchService.search(body)
            .subscribe(res => {
                this.searchResponse = res;
                this.searchSteps[step].toggleLoading();
                this.updateStepStatus(step);
            });
    }
}

