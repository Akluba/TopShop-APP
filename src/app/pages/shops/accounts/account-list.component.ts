import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { firstValueFrom, lastValueFrom, Subscription } from 'rxjs';

import { AccountService } from './account.service';

@Component({
  template:
`
<h2 class="content-block">Account List</h2>
<app-data-list
    [fields] = 'fields'
    [defaultCols] = 'defaultColumns'
    [newObjFields] = 'newObjFields'
    [data]='dataSource'
    confirmDeleteMsg = 'Are you sure you want to delete this record?
    \n Doing so will also delete all shop locations.'
    (navigateTo)="navigate($event)">
</app-data-list>
`
})
export class AccountListComponent implements OnInit, OnDestroy {
  initLoad: boolean;
  fields: any;
  dataSource: any;
  readonly defaultColumns = [];
  readonly newObjFields = ['name'];
  readonly objFields = { name: {title: 'Account Name',column: 'name'} };

  private sub: Subscription;

  constructor (private _route: ActivatedRoute, private _router: Router, public _as: AccountService) {
    this.dataSource = new CustomStore({
        key: 'id',
        load: () => this.load(),
        insert: (values) => this.sendRequest('POST', {values}),
        remove: (key) => this.sendRequest('DELETE',{key})
      })
  }

  ngOnInit(): void {
    this.initLoad = true;
    this.sub = this._route.data.subscribe(data => {
        this.fields = {};

        for (const field of Object.keys(this.objFields)) {
            this.fields[field] = {
                title: this.objFields[field]['title'],
                column_name: this.objFields[field]['column'],
            }
        }

        this.fields = { ...this.fields, ...data.response.data.fields }
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  load(): any {
    if (!this.initLoad) return this.sendRequest();

    this.initLoad = false;

    return firstValueFrom(this._route.data)
        .then((data: any) => data.response.data.account_list)
        .catch((e) => {
            throw e && e.error && e.error.Message;
        });
  }

  sendRequest(method = 'GET', data: any = {}): any {
    let result;

    switch(method) {
        case 'GET':
            result = this._as.index();
            break;
        case 'POST':
            result = this._as.save({ id: 0 , ...data.values });
            break;
        case 'DELETE':
            result = this._as.destroy(data.key);
            break;
    }

    return lastValueFrom(result)
        .then((resp: any) => (method==='GET' ? resp.data.shop_list : resp.data))
        .catch((e) => {
            throw e && e.error && e.error.Message;
        });
  }

  navigate(id): void {
    this._router.navigate([ id ], { relativeTo: this._route });
  }
}

class Account {
  Name: string;
  Status: string;
  StartDate: string;
  AgreementStatus: string;
  PaymentType: string;
  SubscriptionType;
}
