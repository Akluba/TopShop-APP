import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-field-template',
  template: 
`
  <div>
    <!-- Render conditionally based on field.type -->
    <ng-container *ngIf="field.type === 'log'; else inputTemplate">
      <ng-container *ngTemplateOutlet="loggingFieldTemplate"></ng-container>
    </ng-container>

    <ng-template #inputTemplate>
      <ng-container *ngTemplateOutlet="dataInputTemplate"></ng-container>
    </ng-template>

    <!-- Logging Template -->
    <ng-template #loggingFieldTemplate>
      <isd-log-field-control 
        [field]="field" 
        [value]="value"
        (datagridSaved)="fieldUpdated.emit($event)">
      </isd-log-field-control>
    </ng-template>

    <!-- Input Template -->
    <ng-template #dataInputTemplate>
      <isd-data-field-control 
        [field]="field" 
        [value]="value" 
        (valueChanged)="fieldUpdated.emit($event)">
      </isd-data-field-control>
    </ng-template>
  </div>
`
})
export class ISDDynamicTemplateComponent {
  @Input() field: any; 
  @Input() value: any;
  @Output() fieldUpdated = new EventEmitter<any>();
}