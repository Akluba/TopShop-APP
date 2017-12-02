import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let $ : any;

@Component({
    templateUrl: 'shop-details.component.html'
})
export class ShopDetailsComponent implements OnInit{
    response       : {};
    data           : {};
    shopName       : string;
    shopCategories : {};
    constructor(private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.response = data.response;
            this.data = this.response['data'];
            
            this.shopName = this.data['shop_name'];
            this.shopCategories = this.data['categories'];
        });
    }

    ngAfterViewInit(): void {
        $('.secondary.menu .item')
            .tab();
    }
}