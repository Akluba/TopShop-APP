import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CompanyService } from './company.service';

import { RequirementField, Requirement } from './company.model';

declare let $: any;

@Component({
    templateUrl: 'company-requirements.component.html',
    styles: [
        `
            .ui.table { border: none; }
            .ui.table td:last-child, .ui.table th:last-child { border-right: none; }
        `
    ]
})
export class CompanyRequirementsComponent implements OnInit, AfterViewInit, OnDestroy {
    newRequirement: Requirement;
    fieldOptions: RequirementField[];
    conditionOptions: any[];
    valueFieldType: string;
    valueOptions: any[];

    requirements: Requirement[];
    private sub: Subscription;

    constructor(private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.newRequirement = new Requirement;
            this.fieldOptions = data.response.data;
        });
    }

    ngAfterViewInit(): void {
        $('.dropdown').dropdown();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    assessSelectedField(): void {
        // Get selected Field.
        const selectedField = this.fieldOptions.filter(obj => obj.id === +this.newRequirement.field_id);
        const selectedFieldType = selectedField[0].type;

        // When condition previously set, reset.
        if (this.newRequirement.condition) {
            this.newRequirement.condition = null;
            $('.condition.dropdown').dropdown('clear');
        }

        // Populate Condition Options
        this.setConditionOptions(selectedFieldType);

        // Determine field type to use for Value field.
        this.valueFieldType = selectedFieldType;

        // When value previously set, reset.
        if (this.newRequirement.value) {
            this.newRequirement.value = null;
            if (this.valueFieldType === 'select' || this.valueFieldType === 'select_multiple') {
                $('.value.dropdown').dropdown('clear');
            }
        }

        // Init checkbox and select fields.
        setTimeout(() => {
            if (this.valueFieldType === 'checkbox') {
                $('.checkbox').checkbox();
            } else if (this.valueFieldType === 'select' || this.valueFieldType === 'select_multiple') {
                this.valueOptions = selectedField[0]['options'];
                $('.dropdown').dropdown();
            }
        }, 0);
    }

    setConditionOptions(selectedFieldType): void {
        const conditionTypes = {
            'text': [
                {value: 'equal', title: 'Equal To'},
                {value: 'less', title: 'Less Than'},
                {value: 'greater', title: 'Greater Than'},
                {value: 'like', title: 'Like'}
            ],
            'checkbox': [
                {value: 'equal', title: 'Equal To'}
            ],
            'select': [
                {value: 'equal', title: 'Equal To'},
                {value: 'in', title: 'In'},
            ],
            'select_multiple': [
                {value: 'equal', title: 'Equal To'},
                {value: 'in', title: 'In'},
            ]
        };

        this.conditionOptions = conditionTypes[selectedFieldType];
    }
}
