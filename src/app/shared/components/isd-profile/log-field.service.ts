import { Injectable } from '@angular/core';
import { ISDLogFieldComponent } from './log-field-template.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogFieldService {
  private components: ISDLogFieldComponent[] = [];
  private hasChangesSubject = new BehaviorSubject<boolean>(false);

  // Observable to subscribe to unsaved changes
  hasUnsavedChanges$ = this.hasChangesSubject.asObservable();

  register(component: ISDLogFieldComponent): void {
    this.components.push(component);
  }

  unregister(component: ISDLogFieldComponent): void {
    this.components = this.components.filter((comp) => comp !== component);
  }

  getComponents(): ISDLogFieldComponent[] {
    return this.components;
  }

  hasUnsavedChanges(): boolean {
    return this.components.some(comp => comp.dataGrid.instance.hasEditData());
  }

  updateHasChangesState(): void {
    const hasChanges = this.hasUnsavedChanges();
    this.hasChangesSubject.next(hasChanges);
  }
}