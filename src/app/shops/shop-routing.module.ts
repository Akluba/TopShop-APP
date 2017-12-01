import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShopListComponent } from './shop-list.component';

import { ShopListResolver } from './shop-list-resolver.service';

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { 
                path: '',
                component: ShopListComponent,
                resolve: { response: ShopListResolver },
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class ShopRoutingModule {}