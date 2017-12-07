import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopListComponent } from './shop-list.component';
import { ShopDetailsComponent } from './shop-details.component';

import { ShopListResolver } from './shop-list-resolver.service';
import { ShopDetailsResolver } from './shop-details-resolver.service';
import { ShopDetailsGuard } from './shop-guard.service';

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