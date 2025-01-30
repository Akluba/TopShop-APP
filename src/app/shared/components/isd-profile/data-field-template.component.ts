import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import DataSource from 'devextreme/data/data_source';

declare let $: any;

@Component({
    selector: 'isd-data-field-control',
    template:
`
<ng-container [ngSwitch]="field.type">

    <!-- Textbox -->
    <dx-text-box *ngSwitchCase="'text'"
       [value]="value"
       (onValueChanged)="onFieldChanged($event, field.column_name)">
    </dx-text-box>

    <!-- Textarea -->
    <dx-text-area *ngSwitchCase="'textarea'"
        [value]="value"
        (onValueChanged)="onFieldChanged($event, field.column_name)">>
    </dx-text-area>

    <!-- Checkbox -->
    <dx-check-box *ngSwitchCase="'checkbox'"
        [value]="!!value"
        (onValueChanged)="onFieldChanged($event, field.column_name)">>
    </dx-check-box>

    <!-- Date -->
    <dx-date-box *ngSwitchCase="'reminder_date'"
        [value]="value"
        type="date"
        (onValueChanged)="onFieldChanged($event, field.column_name)">
    </dx-date-box>

    <!-- Select -->
    <dx-select-box *ngSwitchCase="'select'"
        [value]="value"
        [dataSource]="dataSource"
        [displayExpr]="field.mapped ? 'name' : 'title'"
        [valueExpr]="'id'"
        [placeholder]="'Select an option'"
        (onValueChanged)="onFieldChanged($event, field.column_name)">
    </dx-select-box>

    <!-- Select Multiple -->
    <dx-tag-box *ngSwitchCase="'select_multiple'"
        [value]="value"
        [dataSource]="dataSource"
        [displayExpr]="field.mapped ? 'name' : 'title'"
        [valueExpr]="'id'"
        [showSelectionControls]="true"
        applyValueMode="useButtons"
        [placeholder]="'Select an option'"
        (onValueChanged)="onFieldChanged($event, field.column_name)">>
    </dx-tag-box>

</ng-container>
`
})
export class ISDDataFieldComponent implements OnInit, OnChanges {
    @Input() field: any;
    @Input() value: any;
    @Output() valueChanged = new EventEmitter<any>();

    dataSource: DataSource;

    ngOnInit() {
        this.parseValue();

        if (this.field.type === 'select' || this.field.type === 'select_multiple') {
            const sort_key = this.field.mapped ? 'name' : 'sort_order';

            this.dataSource = new DataSource({
                store: this.field.options,
                sort: [ sort_key ]
            })
        }
    }

    ngOnChanges(change: SimpleChanges): void {
        if (change['value'] && !change.value.firstChange){
            this.parseValue();
        }
    }

    parseValue() {
        // Initialize the selectedOption value as an integer on load
        if (this.field.type === 'select' && this.value) {
            this.value = parseInt(this.value, 10);
        } else if (this.field.type === 'select_multiple' && this.value) {
            const parsed = JSON.parse(this.value); // Parse the stringified array
            this.value = Array.isArray(parsed) ? parsed : [];
        } else if (this.field.type === 'checkbox' && this.value) {
            const parsed = JSON.parse(this.value); // Parse the stringified array
            this.value = parsed;
        }
    }

    onFieldChanged(event: any, dataField: string): void {
        const tagBoxValue = event.value;

        const newValue = (this.field.type === "select_multiple") ? JSON.stringify(tagBoxValue) : tagBoxValue;

        this.valueChanged.emit({[dataField] : newValue});
    }
    
}