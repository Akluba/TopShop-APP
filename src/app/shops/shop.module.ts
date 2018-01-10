import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';

// Feature Components
import { ShopListComponent } from './shop-list.component';
import { ShopCreateComponent } from './shop-create.component';
import { ShopDetailsComponent } from './shop-details.component';

// Services
import { ShopService } from './shop.service';
import { ShopListResolver } from './shop-list-resolver.service';
import { ShopDetailsResolver, ShopDetailsGuard } from './shop-details.service';
import { ShopFilterPipe } from './shop.pipe';
import { ShopSortPipe } from './shop.pipe';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ShopRoutingModule
    ],
    declarations: [
        ShopListComponent,
        ShopCreateComponent,
        ShopDetailsComponent,
        ShopFilterPipe,
        ShopSortPipe
    ],
    providers: [
        ShopService,
        ShopListResolver,
        ShopDetailsResolver,
        ShopDetailsGuard
    ]
})
export class ShopModule {}
