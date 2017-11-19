import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';

import { CategoryListComponent } from './category-list.component';
import { FieldListComponent } from './field-list.component';
import { FieldEditComponent } from './field-edit.component';
import { FieldOptionsComponent } from './field-options.component';
import { FieldColumnsComponent } from './field-columns.component';
import { ColumnOptionsComponent } from './column-options.component';

import { BreadcrumbComponent } from './setup-breadcrumb.component';
import { ActionItemsComponent } from './setup-action-items.component';

import { SetupService } from './setup.service';
import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [ SharedModule, SetupRoutingModule ],
    declarations: [ 
        CategoryListComponent,
        FieldListComponent,
        FieldEditComponent,
        FieldOptionsComponent,
        FieldColumnsComponent,
        ColumnOptionsComponent,
        BreadcrumbComponent,
        ActionItemsComponent
    ],
    providers: [ 
        SetupService,
        SetupResolver
    ]
})
export class SetupModule {}