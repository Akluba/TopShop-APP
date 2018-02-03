import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SetupRoutingModule } from './setup-routing.module';

import { TableModule } from 'primeng/table';

import { SetupComponent } from './setup.component';
import { BreadcrumbComponent } from './template-breadcrumb.component';
import { SetupTableComponent } from './setup-table.component';

import { SetupService } from './setup.service';
import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        TableModule,
        SetupRoutingModule
    ],
    declarations: [
        SetupComponent,
        BreadcrumbComponent,
        SetupTableComponent
    ],
    providers: [
        SetupService,
        SetupResolver
    ]
})
export class SetupModule {}
