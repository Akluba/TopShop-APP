import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SetupRoutingModule } from './setup-routing.module';

import { TableModule } from 'primeng/table';

import { SetupComponent } from './setup.component';
import { CreateComponent } from './create.component';
import { SetupTableComponent } from './setup-table.component';
import { BreadcrumbComponent } from './template-breadcrumb.component';
import { FieldTableComponent } from './template-field-table.component';

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
        CreateComponent,
        SetupTableComponent,
        BreadcrumbComponent,
        FieldTableComponent
    ],
    providers: [
        SetupService,
        SetupResolver
    ]
})
export class SetupModule {}
