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
    [formElements]="formElements"
    [shops]="shops"
    [saveMessage]="saveMessage">
</app-msn-form>
`
})
export class MSNComponent implements OnInit, OnDestroy {
    private sub: Subscription;
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

    saveForm(body): void {
        console.log(body);
        this._shopService.msnSave(body)
            .subscribe(
                (res) => this.flashMessage({text: res.message, status: 'success'}),
                (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
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
