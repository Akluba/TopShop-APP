import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { confirm } from 'devextreme/ui/dialog';

import { AccountService } from '../../../pages/shops/accounts/account.service';
import { ShopService } from '../../../pages/shops/shops/shop.service';
import { DxFormComponent } from 'devextreme-angular';


@Component({
    selector: 'app-profile-shops',
    templateUrl: './profile-shops.component.html',
    styleUrls: ['./profile-shops.component.scss']
  })
  export class ProfileShopsComponent implements OnInit {
    initLoad: boolean;
    ds: DataSource;
    store: any;
    popupVisible: boolean;
    popupTitle: string;
    positionOf: string;
    stateEditorOptions: Object;
    saveBtnOptions: any;
    closeBtnOptions: any;
    shop: Shop;
    @ViewChild('shopForm') form: DxFormComponent;
    @Input() account: number;
    @Input() shops: Shop[];

    constructor (private _router: Router, private _accountService: AccountService, private _shopService: ShopService) {}

    ngOnInit(): void {
        const that = this;
        this.initLoad = true;
        this.shop = new Shop(this.account);
        this.popupVisible = false;
        this.positionOf = '#profile-shops-container';

        this.stateEditorOptions = { items: states, searchEnabled: true };
        this.saveBtnOptions = {
            text: 'Save',
            onClick(e) { that.save(e) }
        }
        this.closeBtnOptions = {
            text: 'Cancel',
            onClick(e) {
              that.popupVisible = false;
            },
        };

        this.store = new CustomStore({
            load: () => this.load(),
            update: (values) => this.sendRequest('PUT', values),
            insert: (values) => this.sendRequest('POST', values),
            remove: (key) => this.sendRequest('DELETE',{key}),
            onUpdated: () => this.reload(),
            onInserted: () => this.reload(),
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
            case 'PUT':
                result = this._shopService.saveLocation(data);
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

    add(e) {
        e.event.stopPropagation();
        this.shop = new Shop(this.account);
        this.popupTitle = 'New Shop';
        this.popupVisible = true;
    }

    update(e, item) {
        e.event.stopPropagation();
        this.shop = JSON.parse(JSON.stringify({...item, account_id: this.account}));
        this.popupTitle = 'Update Shop';
        this.popupVisible = true;
    }

    save(e) {
        e.event.stopPropagation();

        const form = this.form.instance;

        if (form.validate().isValid) {
            this.shop.hasOwnProperty('id')
                ? this.store.update(this.shop)
                : this.store.insert(this.shop);
        }
    }

    reload() {
        this.popupVisible = false;
        this.ds.reload();
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

    /**
     * Allow the user to navigate to the Shop Profile.
     */
    onItemClick(event) {
        let id = event.itemData.id;
        this._router.navigate(['/shops/', id])
    }
  }

  class Shop {
    constructor(account_id: number, name='', location=new Location()) {
        this.account_id = account_id
        this.name = name
        this.location = location
    }
    account_id: number
    name: string
    location: Location
  }

  class Location {
    constructor(address='', city='', state='', zip='') {
        this.address = address
        this.city = city
        this.state = state
        this.zip = zip
    }
    address: string;
    city: string;
    state: string;
    zip: string;
  }

  const states : string [] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ]