import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopListComponent } from './shop-list.component';
import { ShopDetailsComponent } from './shop-details.component';

import { ShopListResolver } from './shop-list-resolver.service';
import { ShopDetailsResolver, ShopDetailsGuard } from './shop-details.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ShopListComponent, resolve: { response: ShopListResolver } },
            {
                path: ':shop_id',
                component: ShopDetailsComponent,
                resolve: { response: ShopDetailsResolver },
                canDeactivate: [ ShopDetailsGuard ],
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class ShopRoutingModule {}