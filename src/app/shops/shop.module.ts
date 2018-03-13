import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';

// Feature Components
import { ShopListComponent } from './shop-list.component';
import { ShopDetailsComponent } from './shop-details.component';

// Services
import { ShopService } from './shop.service';
import { ShopListResolver, ShopDetailsResolver } from './shop-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ShopRoutingModule
    ],
    declarations: [
        ShopListComponent,
        ShopDetailsComponent
    ],
    providers: [
        ShopService,
        ShopListResolver,
        ShopDetailsResolver
    ]
})
export class ShopModule {}
