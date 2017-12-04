import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { ShopService } from './shop.service';

declare let $ : any;

@Component({
    templateUrl: 'shop-details.component.html'
})
export class ShopDetailsComponent implements OnInit{
    response: {};
    data: {};
    shopName: string;
    shopForm: FormGroup;
    rawShopData: {} = {};
    categoryFieldsets = [];

    constructor(private _route: ActivatedRoute, private _fb: FormBuilder, private _shopService: ShopService) {}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.response = data.response;
            this.data = this.response['data'];
            
            this.shopName = this.data['shop_name'];

            this.buildShopForm();
            this.setRawShopData();
            this.buildCategoryFieldsets();
        });
    }

    ngAfterViewInit(): void {
        $('.secondary.menu .item').tab();
        $('.dropdown').dropdown();
        $('.checkbox').checkbox();
    }

    buildShopForm(): void {
        let field_controls = {};
        let field_values = {};
        this.data['categories'].forEach(category => {
            category.fields.forEach(field => {
                field_controls[field.column_name] = null;
                field_values[field.column_name] = ((field.type === 'select_multiple') ? JSON.parse(field.value) : field.value);
            });
        });

        // Building form controls.
        this.shopForm = this._fb.group(field_controls);
        // Populating form with data.
        this.shopForm.patchValue(field_values);
    }

    setRawShopData(): void {
        this.rawShopData['id'] = this.data['id'];
        this.data['categories'].forEach(category => {
            category.fields.forEach(field => {
                this.rawShopData[field.column_name] = field.value;
            });
        });
    }

    buildCategoryFieldsets(): void {
        this.data['categories'].forEach(category => {
            let fieldset = [];
            fieldset['categoryTitle'] = category.category;
            fieldset['categoryTab'] = category.category.replace(/\s+/g, '');
            fieldset['fields'] = category.fields;
            this.categoryFieldsets.push(fieldset);
        });
    }

    save(): void {        
        if (this.shopForm.dirty && this.shopForm.valid) {
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
                    res => console.log(res),
                    err => console.log(err)
                );
        }
    }
}