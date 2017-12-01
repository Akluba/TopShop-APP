import { Component, OnInit } from '@angular/core';

import { ShopService } from './shop.service';

@Component({
    styles: ['.main.container{ padding-left: 260px }'],
    templateUrl: 'shop-list.component.html'
})
export class ShopListComponent implements OnInit{
    constructor(private _shopService: ShopService) {}

    ngOnInit(): void {
    
    }

}