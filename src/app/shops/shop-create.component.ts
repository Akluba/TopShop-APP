import { Component, OnInit } from '@angular/core';

import { ShopService } from './shop.service';

declare let $ : any;

class Shop {
    id              : number = 0;        
    shop_name       : string = null;
    active          : boolean = true;
    primary_contact : string = null;
    primary_phone   : string = null;
    address         : string = null;
    city            : string = null;
    state           : string = null;
    zip_code        : string = null;
}

@Component({
    selector    : 'shop-create',
    templateUrl : 'shop-create.component.html'
})
export class ShopCreateComponent implements OnInit {
    newShop: {};
    stateOptions = [
        'Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District Of Columbia',
        'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine',
        'Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada',
        'New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
        'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
        'Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
    ];

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