import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShopService } from './shop.service';

declare let $: any;

@Component({
    template:
`
<app-msn-form
    (formSaved)="saveForm($event)"
    [submitStatus]="submitStatus"
    [formElements]="formElements"
    [shops]="shops"
    [saveMessage]="saveMessage">
</app-msn-form>
`
})
export class MSNComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    submitStatus = null;
    formElements: any[];
    shops: any[];
    saveMessage: string;

    constructor(private _route: ActivatedRoute, private _shopService: ShopService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.formElements = data.response.data;
            this.shops = data.response.shops;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    onSaveComplete(res): void {
        this.flashMessage({text: res.message, status: 'success'});
        this.submitStatus = true;
    }

    onSaveError(error): void {
        this.flashMessage({text: <any>error, status: 'negative'});
        this.submitStatus = false;
    }

    saveForm(body): void {
        this._shopService.msnSave(body)
            .subscribe(
                (res) => this.onSaveComplete(res),
                (error: any) => this.onSaveError(error),
                () => setTimeout(() => this.submitStatus = null, 2000)
            );
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
