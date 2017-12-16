import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

// Feature Components
import { ShopListComponent } from './shop-list.component';
import { ShopCreateComponent } from './shop-create.component';
import { ShopDetailsComponent } from './shop-details.component';

// Template Components
import { ShopLoggingField } from './template-logging-field.component';
import { ShopFieldControl } from './template-field-control.component';
import { ShopNote } from './template-note.component';

// Services
import { ShopService } from './shop.service';
import { ShopListResolver } from './shop-list-resolver.service';
import { ShopDetailsResolver } from './shop-details-resolver.service';
import { ShopDetailsGuard } from './shop-guard.service';

@NgModule({
    imports      : [
        SharedModule,
        ReactiveFormsModule,
        ShopRoutingModule
    ],
    declarations : [
        ShopListComponent,
        ShopCreateComponent,
        ShopDetailsComponent,
        ShopLoggingField,
        ShopFieldControl,
        ShopNote
    ],
    providers    : [
        ShopService,
        ShopListResolver,
        ShopDetailsResolver,
        ShopDetailsGuard
    ]
})
export class ShopModule {}