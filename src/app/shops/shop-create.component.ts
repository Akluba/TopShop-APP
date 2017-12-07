import { Component, OnInit } from '@angular/core';

import { ShopService } from './shop.service';

declare let $ : any;

class Shop {
    id              : number = 0;        
    shop_name       : string = null;
}

@Component({
    selector    : 'shop-create',
    templateUrl : 'shop-create.component.html'
})
export class ShopCreateComponent implements OnInit {
    newShop: {};

    constructor(private _shopService: ShopService) {}

    ngOnInit(): void {
        this.newShop = new Shop();
    }

    initiateModal(): void {
        // temp-fix: check to see if a create modal already exists. 
        // if so, remove the previous element.
        if ($('.shop-create').length > 1) {
            $('.shop-create').slice(1).remove();
        }

        // modal settings
        $('.shop-create')
        .modal({
            closable  : false,
            onApprove : () => {
                this.save();
                return false;
            }
        })
        .modal('show');
    }

    save(): void {
        this._shopService.save(this.newShop)
            .subscribe(
                res => console.log(res),
                (error: any) => console.log(<any>error),
                () => {
                    $('.shop-create').modal('hide');
                    this.newShop = new Shop();
                }
            );
    }
}