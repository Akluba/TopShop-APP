import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';

// Feature Components
import { ShopListComponent } from './shop-list.component';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopLocationComponent } from './shop-location.component';
import { MSNComponent } from '../msn/msn.component';
import { MSNFormComponent } from '../msn/msn-form.component';

// Services
import { ShopService } from './shop.service';
import { ShopListResolver, ShopDetailsResolver, LocationResolver, MSNResolver } from './shop-resolve.service';
import { DxMapModule } from 'devextreme-angular';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ShopRoutingModule,
        DxMapModule
    ],
    declarations: [
        ShopListComponent,
        ShopDetailsComponent,
        ShopLocationComponent,
        MSNComponent,
        MSNFormComponent
    ],
    providers: [
        ShopService,
        ShopListResolver,
        ShopDetailsResolver,
        LocationResolver,
        MSNResolver
    ]
})
export class ShopModule {}
