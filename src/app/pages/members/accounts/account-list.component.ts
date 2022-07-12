import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StringLengthRule } from 'devextreme/ui/validation_rules';
import { Subscription } from 'rxjs';

@Component({
  template:
`
<h2 class="content-block">Account List</h2>
<app-data-list
  [data]='accounts'
  key='id'>
</app-data-list>
`
})
export class AccountListComponent implements OnInit, OnDestroy {
  accounts: Account[];
  private sub: Subscription;
  constructor (private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this._route.data.subscribe(data => {
        this.accounts = data.response.data.accounts;
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
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
