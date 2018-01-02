import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

// Feature Components
import { ShopListComponent } from './shop-list.component';
import { ShopCreateComponent } from './shop-create.component';
import { ShopDetailsComponent } from './shop-details.component';

// Services
import { ShopService } from './shop.service';
import { ShopListResolver } from './shop-list-resolver.service';
import { ShopDetailsResolver, ShopDetailsGuard } from './shop-details.service';
import { ShopFilterPipe } from './shop-filter.pipe';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ShopRoutingModule
    ],
    declarations: [
        ShopListComponent,
        ShopCreateComponent,
        ShopDetailsComponent,
        ShopFilterPipe
    ],
    providers: [
        ShopService,
        ShopListResolver,
        ShopDetailsResolver,
        ShopDetailsGuard
    ]
})
export class ShopModule {}