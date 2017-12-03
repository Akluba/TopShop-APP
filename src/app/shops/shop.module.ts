import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

import { ShopListComponent } from './shop-list.component';
import { ShopCreateComponent } from './shop-create.component';
import { ShopDetailsComponent } from './shop-details.component';

import { ShopService } from './shop.service';
import { ShopListResolver } from './shop-list-resolver.service';
import { ShopDetailsResolver } from './shop-details-resolver.service';

@NgModule({
    imports      : [ SharedModule, ReactiveFormsModule, ShopRoutingModule ],
    declarations : [ 
        ShopListComponent,
        ShopCreateComponent,
        ShopDetailsComponent
    ],
    providers    : [ 
        ShopService,
        ShopListResolver,
        ShopDetailsResolver
    ]
})
export class ShopModule {}