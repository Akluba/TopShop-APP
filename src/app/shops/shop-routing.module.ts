import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopListComponent } from './shop-list.component';
import { ShopDetailsComponent } from './shop-details.component';

import { ShopListResolver, ShopDetailsResolver } from './shop-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ShopListComponent, resolve: { response: ShopListResolver } },
            {
                path: ':shop_id',
                component: ShopDetailsComponent,
                resolve: { response: ShopDetailsResolver },
                data: { source_class: 'Shop' }
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class ShopRoutingModule {}
