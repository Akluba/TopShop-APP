import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { confirm } from 'devextreme/ui/dialog';

import { AccountService } from '../../../pages/shops/accounts/account.service';
import { ShopService } from '../../../pages/shops/shops/shop.service';


@Component({
    selector: 'app-profile-shops',
    templateUrl: './profile-shops.component.html',
    styleUrls: ['./profile-shops.component.scss']
  })
  export class ProfileShopsComponent implements OnInit {
    initLoad: boolean;
    ds: DataSource;
    store: any;
    @Input() account: number;
    @Input() shops: Shop[];

    constructor (private _router: Router, private _accountService: AccountService, private _shopService: ShopService) {}

    ngOnInit(): void {
        this.initLoad = true;

        this.store = new CustomStore({
            load: () => this.load(),
            remove: (key) => this.sendRequest('DELETE',{key})
        });

        this.ds = new DataSource({
            store: this.store
        });
    }

    load(): any {
        if (!this.initLoad) return this.sendRequest();

        this.initLoad = false;

        return [{
            key: `Shops (${this.shops.length})`,
            items: this.shops
        }]
    }

    sendRequest(method = 'GET', data: any = {}): any {
        let result;

        switch(method) {
            case 'GET':
                result = this._accountService.showShops(this.account);
                break;
            case 'POST':
                break;
            case 'DELETE':
                result = this._shopService.destroy(data.key);
                break;
        }

        return lastValueFrom(result)
            .then((resp: any) => [{
                key: `Shops (${resp.data.length})`,
                items: resp.data
            }])
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    /**
     * Allow the user to navigate to the Shop Profile.
     */
    onItemClick(event) {
        let id = event.itemData.id;
        this._router.navigate(['/shops/', id])
    }

    /**
     * Allow the user to remove a shop from an account.
     */
    remove(e, id) {
        e.event.stopPropagation();
        // Confirm Deletion
        var confirmation = confirm('Are you sure you want to delete this shop?', 'Confirm Deletion');
        // Remove Shop from Account
        confirmation.then((confirmed) => {
            if (confirmed) {
                this.store.remove(id).done(() => {
                    this.ds.reload();
                });
            }
        });
    }

    clickHandler(e) {
        e.event.stopPropagation();
    }

  }

  class Shop {
    name: string;
    location: {}
  }