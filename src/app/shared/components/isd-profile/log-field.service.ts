import { Injectable } from '@angular/core';
import { ISDLogFieldComponent } from './log-field-template.component';
import { BehaviorSubject, firstValueFrom, lastValueFrom, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LogFieldService {
  private components: ISDLogFieldComponent[] = [];

  private hasChangesSubject = new BehaviorSubject<boolean>(false);
  hasUnsavedChanges$ = this.hasChangesSubject.asObservable();
  
  private singleSaveSubject = new BehaviorSubject<any>(null);
  singleSave$ = this.singleSaveSubject.asObservable();

  private responseSubject = new ReplaySubject<any>(1);
  response$ = this.responseSubject.asObservable();

  

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

  singleSave(body: any): Promise<any> {
    this.responseSubject.next(null);
    this.singleSaveSubject.next(body);

    // return firstValueFrom(this.response$);
    return new Promise((resolve, reject) => {
      this.response$.subscribe({
        next: (response) => {
          if (response === null) return; // Ignore null values
          resolve(response);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  sendResponse(response) {
    this.responseSubject.next(response)
  }
}