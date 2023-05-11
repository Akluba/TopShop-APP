import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    DxTreeListModule,
    DxDataGridModule,
    DxValidatorModule,
    DxButtonModule,
    DxPopupModule,DxFormModule,
    DxTagBoxModule,
    DxSelectBoxModule
} from 'devextreme-angular';
import { ManagerRoutingModule } from './manager-routing.module';

// Feature Components
import { ManagerListComponent } from './manager-list.component';
import { ManagerDetailsComponent } from './manager-details.component';

import { MarketingEffortsComponent } from './marketing efforts/marketing-efforts.component';
import { CompleteMarketingEffortsComponent } from './marketing efforts/complete-marketing-efforts.component';

// Services
import { ManagerService } from './manager.service';
import { ManagerListResolver, ManagerDetailsResolver, MarketingEffortsResolver } from './manager-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        DxTreeListModule,
        DxDataGridModule,
        DxValidatorModule,
        DxButtonModule,
        DxPopupModule,
        DxFormModule,
        DxTagBoxModule,
        DxSelectBoxModule,
        ManagerRoutingModule
    ],
    declarations: [
        ManagerListComponent,
        ManagerDetailsComponent,
        MarketingEffortsComponent,
        CompleteMarketingEffortsComponent
    ],
    providers: [
        ManagerService,
        ManagerListResolver,
        ManagerDetailsResolver,
        MarketingEffortsResolver
    ]
})
export class ManagerModule {}
