import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShopService } from './shop.service';

declare let $ : any;

@Component({
    templateUrl: 'shop-details.component.html'
})
export class ShopDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    shop: {};
    shopName: string;
    message: {};
    rawShopData: {} = {};
    shopForm: FormGroup;
    categoryFieldsets = [];

    private sub: Subscription;

    constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _shopService: ShopService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.shop = data.response.data;
            this.shopName = this.shop['shop_name'];

            this.buildShopForm();
            this.populateShopForm();
            this.setRawShopData();
            this.buildCategoryFieldsets();
        });
    }

    ngAfterViewInit(): void {
        $('.secondary.menu .item').tab();
        $('.dropdown').dropdown();
        $('.checkbox').checkbox();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    buildShopForm(): void {
        let field_controls = {};

        this.shop['categories'].forEach(category => {
            category.fields.forEach(field => {
                if (field.type !== 'log') {
                    field_controls[field.column_name] = null;
                } else {
                    field_controls[field.column_name] = this._fb.array([]);
                }            
            });
        });

        // Build the shopForm controls.
        this.shopForm = this._fb.group(field_controls);
    }

    populateShopForm(): void {
        let field_values = {};

        this.shop['categories'].forEach(category => {
            category.fields.forEach(field => {
                if (field.type !== 'log') {
                    field_values[field.column_name] = ((field.type === 'select_multiple') ? JSON.parse(field.value) : field.value);
                } else if (field.log_entries) {
                    this.setLogEntries(field.column_name, field.log_entries);
                }
            });
        });

        // Populate shopForm with data.
        this.shopForm.patchValue(field_values);
    }

    setLogEntries(control, log_entries) {
        const logEntryFGs = log_entries.map(log_entry => this._fb.group(log_entry));
        const logEntryFA = this._fb.array(logEntryFGs);
        this.shopForm.setControl(control, logEntryFA);
    }

    setRawShopData(): void {
        this.rawShopData['id'] = this.shop['id'];
        this.shop['categories'].forEach(category => {
            category.fields.forEach(field => {
                this.rawShopData[field.column_name] = field.value;
            });
        });
    }

    buildCategoryFieldsets(): void {
        this.shop['categories'].forEach(category => {
            let fieldset = [];
            fieldset['categoryTitle'] = category.title;
            fieldset['categoryTab'] = category.title.replace(/\s+/g, '');
            fieldset['fields'] = category.fields;
            this.categoryFieldsets.push(fieldset);
        });
    }

    save(): void {        
        if (this.shopForm.dirty && this.shopForm.valid) {
            // Copy the form values over the rawShopData object values.
            let body = Object.assign({}, this.rawShopData, this.shopForm.value);

            this.categoryFieldsets.forEach(category => {
                category.fields.forEach(field => {
                    if (field.type === 'select_multiple' && body[field.column_name] != null) {
                        body[field.column_name] = JSON.stringify(body[field.column_name]);
                    }
                });
            });

            this._shopService.save(body)
                .subscribe(
                    res => this.onSaveComplete(res),
                    (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
                );
        }
    }

    onSaveComplete(res: any): void {
        // clear the flags and display success message.
        this.shopForm.markAsPristine();
        this.flashMessage({text: res.message, status: 'success'});
    }

    flashMessage(message): void {
        $('.message').addClass(message.status);
        
        this.message = message;
        
        $('.message')
        .transition('fade', 1000)
        .transition('fade', 1000);
    }
}