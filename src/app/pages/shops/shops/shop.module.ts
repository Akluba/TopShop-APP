import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';

// Feature Components
import { ShopListComponent } from './shop-list.component';
import { ShopDetailsComponent } from './shop-details.component';
import { MSNComponent } from '../msn/msn.component';
import { MSNFormComponent } from '../msn/msn-form.component';

// Services
import { ShopService } from './shop.service';
import { ShopListResolver, ShopDetailsResolver, MSNResolver } from './shop-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ShopRoutingModule
    ],
    declarations: [
        ShopListComponent,
        ShopDetailsComponent,
        MSNComponent,
        MSNFormComponent
    ],
    providers: [
        ShopService,
        ShopListResolver,
        ShopDetailsResolver,
        MSNResolver
    ]
})
export class ShopModule {}
