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
    formElements;
    shopForm: FormGroup;
    message: {};

    private sub: Subscription;

    constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _shopService: ShopService) {}

    ngOnInit(): void {
        // Read the data from the resolver.
        this.sub = this._route.data.subscribe(data => {
            this.shop = data.response.data.shop;
            this.formElements = data.response.data.form_elements;
            
            this.buildShopForm();
            this.populateShopForm();
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

        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                field_controls[field.column_name] = null;
            });
        });

        // Build the shopForm controls.
        this.shopForm = this._fb.group(field_controls);
    }

    populateShopForm(): void {
        let field_values = {};

        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                if (field.type !== 'log') {
                    field_values[field.column_name] = ((field.type === 'select_multiple') ? JSON.parse(this.shop[field.column_name]) : this.shop[field.column_name]);
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
        logEntryFGs.push(this._fb.group(new LogEntry(this.shop['id'], fieldId)));

        // Existing log entries.
        if (this.shop[field.column_name]) {
            this.shop[field.column_name].map(logEntry => {
                logEntryFGs.push(this._fb.group(logEntry));
            });
        }

        const logEntryFA = this._fb.array(logEntryFGs);
        this.shopForm.setControl(control, logEntryFA);
    }

    removeLogEntry(body): void {
        for (let control in body) {
            if (Array.isArray(body[control])) {
                let logEntryFA = this.getLogEntryFA(control);
                let newLogEntry = logEntryFA.controls[0];
                if (newLogEntry.pristine) {
                    body[control].splice(0,1);
                }
            }
        }

        return body;
    }

    getLogEntryFA(control): FormArray {
        return this.shopForm.get(control) as FormArray;
    }

    save(): void {        
        if (this.shopForm.dirty && this.shopForm.valid) {
            // Copy the form values over the rawShopData object values.
            let body = Object.assign({}, this.shop, this.shopForm.value);

            this.formElements.forEach(category => {
                category.fields.forEach(field => {
                    if (field.type === 'select_multiple' && body[field.column_name] != null) {
                        body[field.column_name] = JSON.stringify(body[field.column_name]);
                    }
                });
            });

            // console.log(JSON.stringify(body));
            body = this.removeLogEntry(body);

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