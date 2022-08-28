import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SetupRoutingModule } from './setup-routing.module';

import {
    DxToolbarModule,
    DxDataGridModule,
    DxSortableModule,
    DxAccordionModule
} from 'devextreme-angular';

import { TableModule } from 'primeng/table';
import { OrderListModule } from 'primeng/orderlist';

import { SetupComponent } from './setup.component';
import { FieldsTableComponent } from './fields-table.component';
import { BreadcrumbComponent } from './template-breadcrumb.component';
import { SetupTableComponent } from './setup-table.component';


import { SetupService } from './setup.service';
import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        DxToolbarModule,
        DxDataGridModule,
        DxSortableModule,
        DxAccordionModule,
        TableModule,
        OrderListModule,
        SetupRoutingModule
    ],
    declarations: [
        SetupComponent,
        FieldsTableComponent,
        BreadcrumbComponent,
        SetupTableComponent
    ],
    providers: [
        SetupService,
        SetupResolver
    ]
})
export class SetupModule {}
