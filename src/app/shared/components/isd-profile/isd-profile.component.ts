import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { LogFieldService } from './log-field.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-isd-profile',
  templateUrl: './isd-profile.component.html',
  styles: [
      '.toolbar-label { font-size: 18px; margin-bottom: 10px;}',
      '.section-container { background-color: #fff; padding: 50px; }'
    ]
})
export class ISDProfileComponent implements OnInit {
  constructor(private _router: Router, private _lfService: LogFieldService) {}

  @Input() sourceClass: string;
  @Input() formValues: {};
  @Input() formElements: any[];
  @Input() saveResponse: {};
  @Input() saveCompleted$!: Observable<void>;
  @Output() formSaved = new EventEmitter<any>();
  @Output() requestSaveReset = new EventEmitter<void>();

  sourceTitle: string;
  sourceIcon: string;
  initialValues: any; // Store initial values
  changedFields: any = {};
  cleanForm: boolean = true;
  listLink: any;

  ngOnInit(): void {
    this.sourceTitle = this.sourceClass === 'Shop' ? 'Affiliate' : 'Insurance Manager';
    this.sourceIcon = this.sourceClass === 'Shop' ? 'dx-icon-home' : 'dx-icon-user';
    this.listLink = this.sourceClass === 'Shop' ? ['/shops'] : ['/managers'];

    // Create a deep copy for tracking changes
    this.initialValues = JSON.parse(JSON.stringify(this.formValues));

    this._lfService.updateHasChangesState()

    // Subscribe to logfields to watch for changes
    this._lfService.hasUnsavedChanges$.subscribe((hasChanges) => {
      this.cleanForm = !hasChanges;
    });
  }

  resetForm(): void {
    let reload = [...this.listLink, this.formValues['id']];
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate(reload)});
  }

  onFieldDataChanged(e: any) {
    const [keyPath, newValue] = [Object.keys(e)[0], Object.values(e)[0]]; // Extract key path and new value
    const keys = keyPath.split('.'); // Split nested keys, e.g., 'address.street'
  
    // Traverse to the original value
    let original = this.initialValues;
    for (let i = 0; i < keys.length - 1; i++) {
      original = original[keys[i]];
    }
    const finalKey = keys[keys.length - 1];
  
    // Loose Compare new value with original value
    const isDirty = newValue != original[finalKey];
  
    // Update dirty fields
    if (isDirty) {
      this.markFieldAsDirty(keys, finalKey, newValue);
    } else {
      this.removeFieldFromDirty(keys, finalKey);
    }

    this.cleanForm = Object.keys(this.changedFields).length === 0 && !this._lfService.hasUnsavedChanges();
  }

  onSubmit(): void {
    if ((this.changedFields && Object.keys(this.changedFields).length > 0) || this._lfService.hasUnsavedChanges()) {
      // Emit event to parent requesting reset of saveCompleted$
      this.requestSaveReset.emit();

      // Trigger save for logging fields
      const processPromises = this.collectDataGridData();

      // Wait for all save operations to complete
      Promise.all(processPromises)
        .then(() => {
            this.changedFields['id'] = this.formValues['id'];
            
            this.formSaved.emit(this.changedFields);
            
            return new Promise(resolve => setTimeout(resolve, 0)) // Forces microtask queue cycle
              .then(() => lastValueFrom(this.saveCompleted$))
              .catch((error) => { 
                console.error(`${new Date().toISOString()} - Error caugth by LastValue: `, error);
                throw error; 
              });
        })
      .then((updatedValues) => {
        this.resolveDataGridPromises(true);
        this.performPostSaveTasks(updatedValues);
      })
      .catch((error) => {
        console.error(`${new Date().toISOString()} - Error during save:`, error);

        // Reject all `e.promise` promises in DataGrids
        this.resolveDataGridPromises(false);
      });
    }
  } 

  collectDataGridData(): Promise<void>[] {
    return this._lfService.getComponents()
      .map((lf) => {
        if(lf.dataGrid.instance.hasEditData()) {
          lf.dataGrid.instance.saveEditData();
          return lf.pendingChangesPromise;
        }

        return Promise.resolve();
      });
  }

  resolveDataGridPromises(success: boolean): void {
    this._lfService.getComponents()
      .map((lf) => {
        if(lf.saveResolver) {
          lf.finalizeSave(success);
        }
      });
  }

  performPostSaveTasks(updatedValues): void {
    // Reset form state
    this.formValues = updatedValues;
    this.initialValues = JSON.parse(JSON.stringify(this.formValues));
    this.changedFields = {};
    this.cleanForm = true;
  }

  // TODO: Move into dynamic-field-template
  getInlineOrNestedValue(col): any {
    if (!col) return null;

    const keys = col.split('.');

    return keys.reduce((acc, curr) => acc && acc[curr], this.formValues);
  }

  private markFieldAsDirty(keys: string[], finalKey: string, newValue: any): void {
    if (keys.length === 1) {
      // Non-nested key: directly update
      this.changedFields[keys[0]] = newValue;
    } else {
      // Nested key: ensure parent exists and update
      const parentKey = keys[0];
      if (!this.changedFields[parentKey]) {
        this.changedFields[parentKey] = {};
      }
      this.changedFields[parentKey][finalKey] = newValue;
    }
  }
  
  private removeFieldFromDirty(keys: string[], finalKey: string): void {
    const parentKey = keys[0];
    if (keys.length === 1) {
      // Non-nested key: remove directly
      delete this.changedFields[parentKey];
    } else {
      // Nested key: remove and clean up parent
      delete this.changedFields[parentKey][finalKey];
      if (Object.keys(this.changedFields[parentKey]).length === 0) {
        delete this.changedFields[parentKey]; // Remove parent if empty
      }
    }
  }

}
