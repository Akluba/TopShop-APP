import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dynamic-field-template',
  template: 
`
<ng-container [ngSwitch]="field.type">

  <isd-log-field-control *ngSwitchCase="'log'"
    [field]="field" 
    [value]="value"
    (datagridSaved)="fieldUpdated.emit($event)">
  </isd-log-field-control>

  <isd-log-field-control *ngSwitchCase="'contacts'"
    [field]="field" 
    [value]="value"
    (datagridSaved)="fieldUpdated.emit($event)">
  </isd-log-field-control>

  <isd-notes-field-control *ngSwitchCase="'notes'"
    [field]="field" 
    [value]="value">
  </isd-notes-field-control>

  <isd-data-field-control *ngSwitchDefault
    [field]="field" 
    [value]="value" 
    (valueChanged)="fieldUpdated.emit($event)">
  </isd-data-field-control>
  
</ng-container>

`
})
export class ISDDynamicTemplateComponent {
  @Input() field: any; 
  @Input() value: any;
  @Output() fieldUpdated = new EventEmitter<any>();
}