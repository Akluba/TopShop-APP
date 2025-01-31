import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Subject, Subscription, tap } from 'rxjs';

import { ManagerService } from './manager.service';
import { LogFieldService } from 'src/app/shared/components/isd-profile/log-field.service';

declare let $: any;

@Component({
    template:
`
<app-isd-profile
    [sourceClass]="sourceClass"
    [formValues]="formValues"
    [formElements]="formElements"
    [saveCompleted$]="saveCompleted$"
    [saveResponse]="saveResponse"
    (requestSaveReset)="resetSaveCompleted()"
    (formSaved)="saveForm($event)">
</app-isd-profile>
`
})
export class ManagerDetailsComponent implements OnInit, OnDestroy {
    sourceClass: string;
    formValues: {};
    formElements: any[];
    saveResponse: {};
    saveCompleted$: Subject<void>;
    
    private sub: Subscription;
    private saveSub!: Subscription;

    constructor(private _route: ActivatedRoute, private _managerService: ManagerService, private _lfService: LogFieldService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.sourceClass = data.source_class;
            this.formValues = data.response.data.manager;
            this.formElements = data.response.data.form_elements;
        });

        this.saveSub = this._lfService.singleSave$.subscribe(body => {
            if (body) { this.saveSingleLog(body); }
        })
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    saveSingleLog(body: any) {
        this._managerService.save(body).subscribe({
            next: (response) => {
                this._lfService.sendResponse(response.manager);
            },
            error: (error) => {
                this._lfService.sendResponse({error: true, message: 'Failed to save'})
            }
        })
    }

    saveForm(body): void {
        this._managerService.save(body)
            .pipe(
                tap((res) => this.onSaveComplete(res)),
                catchError((error: any) => {
                    this.flashMessage({text: <any>error, status: 'error'});
                    
                    this.saveCompleted$.error(error); // Emit an error signal
                    console.error(`${new Date().toISOString()} - Error caugth by save: `, error);

                    return EMPTY;
                })
            ).subscribe();
    }

    onSaveComplete(res): void {
        this.flashMessage({text: res.message, status: 'success'});
        this.formValues = res.manager;

        this.saveCompleted$.next(res.manager);
        this.saveCompleted$.complete();
    }

    flashMessage(message): void {
        this.saveResponse = {
            visible: true,
            type: message.status,
            message:message.text
        }
    }

    resetSaveCompleted(): void {
        if (this.saveCompleted$) {
            this.saveCompleted$.error('Save reset'); // Ensure subscribers handle cleanup
            this.saveCompleted$.complete(); // Complete old subject
        }
        this.saveCompleted$ = new Subject<void>();
    }

}
