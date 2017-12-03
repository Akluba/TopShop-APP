import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

declare let $ : any;

@Component({
    templateUrl: 'shop-details.component.html'
})
export class ShopDetailsComponent implements OnInit{
    response: {};
    data: {};
    shopForm: FormGroup;
    shopName: string;
    categoryFieldsets = [];
    constructor(private _route: ActivatedRoute, private _fb: FormBuilder) {}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.response = data.response;
            this.data = this.response['data'];
            
            this.shopName = this.data['shop_name'];

            this.buildShopForm();
            this.buildCategoryFieldsets();
            
        });
    }

    ngAfterViewInit(): void {
        $('.secondary.menu .item').tab();
        $('.dropdown').dropdown();
        $('.checkbox').checkbox();
    }

    buildShopForm(): void {
        let groups = {};
        this.data['categories'].forEach(category => {
            let categoryGroup = `${category.category.replace(/\s+/g, '')}Group`;
            let fields = {};
            category.fields.forEach(field => {
                fields[field.column_name] = null
            });
            groups[categoryGroup] = this._fb.group(fields);
        });

        this.shopForm = this._fb.group(groups);
    }

    buildCategoryFieldsets(): void {
        this.data['categories'].forEach(category => {
            let fieldset = [];
            fieldset['categoryTitle'] = category.category;
            fieldset['categoryTab'] = category.category.replace(/\s+/g, '');
            fieldset['categoryGroup'] = `${category.category.replace(/\s+/g, '')}Group`;
            fieldset['fields'] = category.fields;
            this.categoryFieldsets.push(fieldset);
        });
    }


    save(): void {
        console.log('Saved: ' + JSON.stringify(this.shopForm.value));
    }
}