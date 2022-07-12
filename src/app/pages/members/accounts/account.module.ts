import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

// Feature Components
import { AccountListComponent } from './account-list.component'

// Services
import { AccountListResolver, AccountService } from './account.service';

@NgModule({
  imports: [
      RouterModule.forChild([
          { path: '', component: AccountListComponent,resolve: { response: AccountListResolver }},
          // { path: 'multi/notes', pathMatch: 'full', component: MSNComponent, resolve: { response: MSNResolver }},
          // {
          //     path: ':shop_id',
          //     component: ShopDetailsComponent,
          //     resolve: { response: ShopDetailsResolver },
          //     data: { source_class: 'Shop' }
          // }
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
    AccountListComponent
  ],
  providers: [
    AccountService,
    AccountListResolver
  ]
})
export class AccountModule { }