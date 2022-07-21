import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ShopService } from './shop.service';

declare let $: any;

@Component({
    template:
`
<app-details-form
    (formSaved)="saveForm($event)"
    [sourceClass]="sourceClass"
    [formValues]="formValues"
    [formElements]="formElements"
    [saveResponse]="saveResponse">
</app-details-form>
`
})
export class ShopDetailsComponent implements OnInit, OnDestroy {
    sourceClass: string;
    formValues: {};
    formElements: any[];
    saveResponse: {};
    private sub: Subscription;

    constructor(private _route: ActivatedRoute, private _shopService: ShopService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.sourceClass = data.source_class;
            this.formValues = data.response.data.shop;
            this.formElements = data.response.data.form_elements;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    saveForm(body): void {
        this._shopService.save(body)
            .subscribe(
                (res) => this.onSaveComplete(res),
                (error: any) => this.flashMessage({text: <any>error, status: 'error'})
            );
    }

    onSaveComplete(res): void {
        this.flashMessage({text: res.message, status: 'success'});
        this.formValues = res.shop;
    }

    flashMessage(message): void {
        // $('.message')
        //     .removeClass('success negative')
        //     .addClass(message.status);

        // this.saveMessage = message.text;
        this.saveResponse = {
            visible: true,
            type: message.status,
            message:message.text
        }

        // $('.message')
        //     .transition('fade', 1000)
        //     .transition('fade', 1000)
        //     ;
    }

}
