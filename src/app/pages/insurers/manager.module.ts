import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxTreeListModule, DxValidatorModule } from 'devextreme-angular';
import { ManagerRoutingModule } from './manager-routing.module';

// Feature Components
import { ManagerListComponent } from './manager-list.component';
import { ManagerDetailsComponent } from './manager-details.component';

import { MarketingEffortsComponent } from './marketing efforts/marketing-efforts.component';

// Services
import { ManagerService } from './manager.service';
import { ManagerListResolver, ManagerDetailsResolver, MarketingEffortsResolver } from './manager-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        DxTreeListModule,
        DxValidatorModule,
        ManagerRoutingModule
    ],
    declarations: [
        ManagerListComponent,
        ManagerDetailsComponent,
        MarketingEffortsComponent
    ],
    providers: [
        ManagerService,
        ManagerListResolver,
        ManagerDetailsResolver,
        MarketingEffortsResolver
    ]
})
export class ManagerModule {}
