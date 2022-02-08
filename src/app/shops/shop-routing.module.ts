import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopListComponent } from './shop-list.component';
import { ShopDetailsComponent } from './shop-details.component';
import { MSNComponent } from './msn.component';

import { ShopListResolver, ShopDetailsResolver, MSNResolver } from './shop-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ShopListComponent, resolve: { response: ShopListResolver } },
            { path: 'multi/notes', pathMatch: 'full', component: MSNComponent, resolve: { response: MSNResolver }},
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
