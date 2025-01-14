import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-field-template',
  template: `
    <div>
      <!-- Render conditionally based on field.type -->
      <ng-container *ngIf="field.type === 'log'; else inputTemplate">
        <ng-container *ngTemplateOutlet="loggingFieldTemplate"></ng-container>
      </ng-container>
      <ng-template #inputTemplate>
        <ng-container *ngTemplateOutlet="defaultInputTemplate"></ng-container>
      </ng-template>

      <!-- Logging Template -->
      <ng-template #loggingFieldTemplate>
        <dx-data-grid
            [id]="field.column_name"
            [dataSource]="value"
            keyExpr="id"
            [showBorders]="true">
            <dxi-column *ngFor="let column of columnsWithLookup"
                [dataField]="column.column_name"
                [caption]="column.title"
                [lookup]="column.lookup || null">
            </dxi-column>
        </dx-data-grid>
      </ng-template>

      <!-- Input Template -->
      <ng-template #defaultInputTemplate>
        <isd-field-control [field]="field" [value]="value"></isd-field-control>
      </ng-template>
    </div>
  `
})
export class DynamicTemplateComponent implements OnInit {
  @Input() field: any; // Field object passed from parent
  @Input() value: any;

  // Precomputed columns with lookup options
  columnsWithLookup: any[] = [];

  ngOnInit() {
    // Precompute lookup options for select columns
    if (this.field.type==='log'){
        this.columnsWithLookup = this.field.columns.map(column => {
        if (column.type === 'select' && column.options) {
            return {
            ...column,
            lookup: {
                dataSource: column.options,
                displayExpr: column.mapped ? 'name' : 'title',
                valueExpr: 'id',
            }
            };
        }
        return column; // Non-select columns are returned as-is
        });
    }
  }
}