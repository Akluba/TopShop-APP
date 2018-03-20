import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CompanyService } from './company.service';

declare let $: any;

@Component({
    template:
`
<button class="ui small basic right floated reqs button"
    [routerLink]="['./requirements']">
    <i class="icon file alternate"></i>
    Requirements
</button>
<!-- <div style="clear:both"></div> -->
<app-details-form
    (formSaved)="saveForm($event)"
    [sourceClass]="sourceClass"
    [formValues]="formValues"
    [formElements]="formElements"
    [saveMessage]="saveMessage">
</app-details-form>
`,
styles:
[`
    .ui.button.reqs { position: relative; z-index: 1;}
`]
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
    sourceClass: string;
    formValues: {};
    formElements: any[];
    companyId: number;
    saveMessage: string;
    private sub: Subscription;

    constructor(private _route: ActivatedRoute, private _companyService: CompanyService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.sourceClass = data.source_class;
            this.formValues = data.response.data.company;
            this.companyId = this.formValues['id'];
            this.formElements = data.response.data.form_elements;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    saveForm(body): void {
        this._companyService.save(body)
            .subscribe(
                (res) => this.onSaveComplete(res),
                (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
            );
    }

    onSaveComplete(res): void {
        this.flashMessage({text: res.message, status: 'success'});
        this.formValues = res.company;
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
