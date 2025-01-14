import { Component, Input, OnInit } from '@angular/core';

declare let $: any;

@Component({
    selector: 'isd-field-control',
    template:
`
<ng-container [ngSwitch]="field.type">

    <!-- Textbox -->
    <dx-text-box *ngSwitchCase="'text'"
       [(value)]="value">
    </dx-text-box>

    <!-- Textarea -->
    <dx-text-area *ngSwitchCase="'textarea'"
        [(value)]="value">
    </dx-text-area>

    <!-- Checkbox -->
    <dx-check-box *ngSwitchCase="'checkbox'"
        [(value)]="value">
    </dx-check-box>

    <!-- Select -->
    <dx-select-box *ngSwitchCase="'select'"
        [(value)]="value"
        [items]="field.options"
        [displayExpr]="field.mapped ? 'name' : 'title'"
        [valueExpr]="'id'"
        [placeholder]="'Select an option'"
    ></dx-select-box>

    <!-- Select Multiple -->
    <dx-tag-box *ngSwitchCase="'select_multiple'"
        [(value)]="value"
        [items]="field.options"
        [displayExpr]="field.mapped ? 'name' : 'title'"
        [valueExpr]="'id'"
        [showSelectionControls]="true"
        applyValueMode="useButtons"
        [placeholder]="'Select an option'"
    ></dx-tag-box>

</ng-container>
`
})
export class ISDDataFieldComponent implements OnInit {
    @Input() field: any;
    @Input() value: any;

    ngOnInit() {
        // Initialize the selectedOption value as an integer on load
        if (this.field.type === 'select' && this.value !== null) {
            this.value = parseInt(this.value, 10);
        } else if (this.field.type === 'select_multiple') {
            const parsed = JSON.parse(this.value); // Parse the stringified array
            this.value = Array.isArray(parsed) ? parsed : [];
        }
    }
}