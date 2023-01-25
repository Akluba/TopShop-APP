import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

// Feature Components
import { AccountListComponent } from './account-list.component'
import { AccountDetailsComponent } from './account-details.component'

// Services
import {
  AccountListResolver,
  AccountDetailsResolver,
  AccountService
} from './account.service';

import { ShopService } from '../shops/shop.service';

@NgModule({
  imports: [
      RouterModule.forChild([
          { path: '', component: AccountListComponent,resolve: { response: AccountListResolver }},
          {
              path: ':account_id',
              component: AccountDetailsComponent,
              resolve: { response: AccountDetailsResolver },
              data: { source_class: 'Account' }
          }
      ])
  ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule {}

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountListComponent,
    AccountDetailsComponent
  ],
  providers: [
    AccountService,
    ShopService,
    AccountListResolver,
    AccountDetailsResolver
  ]
})
export class AccountModule { }