import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ManagerService } from './manager.service';

declare let $: any;

@Component({
    template:
`
<app-details-form
    (formSaved)="saveForm($event)"
    [sourceClass]="sourceClass"
    [formValues]="formValues"
    [formElements]="formElements"
    [saveMessage]="saveMessage">
</app-details-form>
`
})
export class ManagerDetailsComponent implements OnInit, OnDestroy {
    sourceClass: string;
    formValues: {};
    formElements: any[];
    saveMessage: string;
    private sub: Subscription;

    constructor(private _route: ActivatedRoute, private _managerService: ManagerService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.sourceClass = data.source_class;
            this.formValues = data.response.data.manager;
            this.formElements = data.response.data.form_elements;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    saveForm(body): void {
        this._managerService.save(body)
            .subscribe(
                (res) => this.onSaveComplete(res),
                (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
            );
    }

    onSaveComplete(res): void {
        this.flashMessage({text: res.message, status: 'success'});
        this.formValues = res.manager;
    }

    flashMessage(message): void {
        $('.message')
            .removeClass('success negative')
            .addClass(message.status);

        this.saveMessage = message.text;

        $('.message')
            .transition('fade', 1000)
            .transition('fade', 1000)
            ;
    }

}
