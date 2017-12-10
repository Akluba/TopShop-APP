import { Component, OnInit, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

    formatInputValues(type, value): any {
        if (type === 'select_multiple') {
            return JSON.parse(value);
        }
        else if (type === 'checkbox') {
            return (value === '1') ? true : false;
        }
        else {
            return value;
        }
    }

    populateShopForm(): void {
        let field_values = {};

        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                if (field.type !== 'log') {
                    field_values[field.column_name] = this.formatInputValues(field.type, this.shop[field.column_name]);
                }
                else {
                    this.setExistingLogEntries(field);
                    this.addLogEntry(field);
                }
            });
        });

        // Populate shopForm with data.
        this.shopForm.patchValue(field_values);
    }

    formatFG(field, logEntry): FormGroup {
        field.columns.forEach(column => {
            logEntry[column.column_name] = this.formatInputValues(column.type, logEntry[column.column_name]);
        });

        logEntry['deleted'] = null;

        return this._fb.group(logEntry);
    }

    setExistingLogEntries(field): void {
        let control = field.column_name;

        if (this.shop[control]) {
            let logEntryFGs = this.shop[control].map(logEntry => this.formatFG(field, logEntry));
            let logEntryFA = this._fb.array(logEntryFGs);
            this.shopForm.setControl(control, logEntryFA);
        }
    }

    addLogEntry(field): void {
        let control = field.column_name;
        let fieldId = field.id; 

        // Get the existing log entry form array.
        let logEntryFA = this.getLogEntryFA(control);
        let logEntryFGs = (logEntryFA.controls) ? logEntryFA.controls : [];

        // Position the new log entry control in index 0.
        let newLogEntry = this._fb.group(new LogEntry(this.shop['id'], fieldId));
        logEntryFGs.unshift(newLogEntry);
        
        // Set the form array control with the new log entry included.
        logEntryFA = this._fb.array(logEntryFGs);
        this.shopForm.setControl(control, logEntryFA);
    }

    getLogEntryFA(control): FormArray {
        return this.shopForm.get(control) as FormArray;
    }

    logEntryPristine(control): boolean {
        let logEntryFA = this.getLogEntryFA(control);
        let newLogEntry = logEntryFA.controls[0];
                
        return newLogEntry.pristine;
    }

    flashMessage(message): void {
        $('.message').addClass(message.status);
        
        this.message = message;
        
        $('.message')
        .transition('fade', 1000)
        .transition('fade', 1000);
    }

    logEntryDeleted(control): boolean {
        let logEntryFA = this.getLogEntryFA(control);
        if (logEntryFA.pristine) {
            return false;
        }

        let logEntryFGs = logEntryFA.value;

        for(let i=0; i<logEntryFGs.length; i++) {
            if (logEntryFGs[i]['deleted'] === true) {
                return true;
            }
        }

        return false;
    }

    updateLoggingFields(): void {
        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                if (field.type === 'log' && (!this.logEntryPristine(field.column_name) || this.logEntryDeleted(field.column_name))) {
                    this.setExistingLogEntries(field);
                    this.addLogEntry(field);
                }
            });
        });
    }

    onSaveComplete(response: any): void {
        // store the new shop object.
        this.shop = response.data;
        this.updateLoggingFields();

        // clear the flags and display success message.
        this.shopForm.markAsPristine();
        this.flashMessage({text: response.message, status: 'success'});
    }

    formatBody(body): void {
        this.formElements.forEach(category => {
            category.fields.forEach(field => {
                if (field.type === 'log' && this.logEntryPristine(field.column_name)) {
                    body[field.column_name].splice(0,1);
                }
                else if (field.type === 'select_multiple' && body[field.column_name] != null) {
                    body[field.column_name] = JSON.stringify(body[field.column_name]);
                }
            });
        });

        return body;
    }

    save(): void {        
        if (this.shopForm.dirty && this.shopForm.valid) {
            // Copy the form values over the rawShopData object values.
            let body = Object.assign({}, this.shop, this.shopForm.value);
            body = this.formatBody(body);

            // console.log(body);

            this._shopService.save(body)
                .subscribe(
                    response => this.onSaveComplete(response),
                    (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
                );
        }
    }

}