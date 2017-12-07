import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ShopService } from './shop.service';

declare let $ : any;

export class LogEntry {
    id: number = 0;
    source_class: string = 'Shop';
    source_id: number;
    field_id: number;
    log_field1: string = null;
    log_field2: string = null;
    log_field3: string = null;
    log_field4: string = null;
    log_field5: string = null;
    log_field6: string = null;
    log_field7: string = null;
    log_field8: string = null;
    log_field9: string = null;
    log_field10: string = null;

    constructor(source_id, field_id) {
        this.source_id = source_id;
        this.field_id = field_id;
    }
}

@Component({
    templateUrl: 'shop-details.component.html'
})
export class ShopDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    shop: {};
    shopId: number;
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
            this.shopId = this.shop['id'];
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
                } 
                else {
                    this.setLogEntries(field);
                }
            });
        });

        // Populate shopForm with data.
        this.shopForm.patchValue(field_values);
    }

    setLogEntries(field) {
        const fieldId = field.id;
        const control = field.column_name;
        const logEntryFGs = [];
        
        // Initial empty log entry.
        logEntryFGs.push(this._fb.group(new LogEntry(this.shopId, fieldId)));

        // Existing log entries.
        if (field.log_entries) {
            field.log_entries.map(logEntry => {
                logEntryFGs.push(this._fb.group(logEntry));
            });
        }

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

    unsetPristineInitialLEs(): void {
        this.shop['categories'].forEach(category => {
            category.fields.forEach(field => {
                if (field.type === 'log') {
                    let logEntryFA = this.shopForm.get(field.column_name) as FormArray;
                    let initialLE = logEntryFA.controls[0];
                    if (initialLE.pristine) {
                        logEntryFA.removeAt(0);
                    }
                    console.log(logEntryFA)
                }
            });
        });
    }

    save(): void {        
        if (this.shopForm.dirty && this.shopForm.valid) {

            // unset Initial log entries that are pristine.
            // this.unsetPristineInitialLEs();

            // Copy the form values over the rawShopData object values.
            let body = Object.assign({}, this.rawShopData, this.shopForm.value);

            this.categoryFieldsets.forEach(category => {
                category.fields.forEach(field => {
                    if (field.type === 'select_multiple' && body[field.column_name] != null) {
                        body[field.column_name] = JSON.stringify(body[field.column_name]);
                    }
                });
            });

            // console.log(body);

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