import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopListComponent } from './shop-list.component';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopLocationComponent } from './shop-location.component';
import { MSNComponent } from '../msn/msn.component';

import { ShopListResolver, ShopDetailsResolver, MSNResolver, LocationResolver } from './shop-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ShopListComponent, resolve: { response: ShopListResolver } },
            { path: 'locations', pathMatch: 'full', component: ShopLocationComponent, resolve: { response: LocationResolver }},
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
