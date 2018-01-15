import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';

import { DataTableModule, MultiSelectModule, SharedModule as PrimeShared } from 'primeng/primeng';

// Feature Components
import { ShopListComponent } from './shop-list.component';
import { ShopCreateComponent } from './shop-create.component';
import { ShopDetailsComponent } from './shop-details.component';

// Services
import { ShopService } from './shop.service';
import { ShopListResolver } from './shop-list-resolver.service';
import { ShopDetailsResolver, ShopDetailsGuard } from './shop-details.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ShopRoutingModule,
        DataTableModule,
        MultiSelectModule,
        PrimeShared
    ],
    declarations: [
        ShopListComponent,
        ShopCreateComponent,
        ShopDetailsComponent
    ],
    providers: [
        ShopService,
        ShopListResolver,
        ShopDetailsResolver,
        ShopDetailsGuard
    ]
})
export class ShopModule {}
