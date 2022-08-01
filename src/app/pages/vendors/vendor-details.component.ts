import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { VendorService } from './vendor.service';

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
export class VendorDetailsComponent implements OnInit, OnDestroy {
    sourceClass: string;
    formValues: {};
    formElements: any[];
    saveResponse: {};
    private sub: Subscription;

    constructor(private _route: ActivatedRoute, private _vendorService: VendorService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.sourceClass = data.source_class;
            this.formValues = data.response.data.vendor;
            this.formElements = data.response.data.form_elements;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    saveForm(body): void {
        this._vendorService.save(body)
            .subscribe(
                (res) => this.onSaveComplete(res),
                (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
            );
    }

    onSaveComplete(res): void {
        this.flashMessage({text: res.message, status: 'success'});
        this.formValues = res.vendor;
    }

    flashMessage(message): void {
        this.saveResponse = {
            visible: true,
            type: message.status,
            message:message.text
        }
    }

}
