import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    template:
`
<app-details-form
    [formValues]="formValues"
    [formElements]="formElements">
</app-details-form>
`
})
export class VendorDetailsComponent implements OnInit, OnDestroy {
    formValues: {};
    formElements: any[];
    private sub: Subscription;

    constructor(private _route: ActivatedRoute) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.formValues = data.response.data.vendor;
            this.formElements = data.response.data.form_elements;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
