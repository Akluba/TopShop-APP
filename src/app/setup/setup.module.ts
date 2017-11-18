import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';

import { CategoryListComponent } from './category-list.component';
import { FieldListComponent } from './field-list.component';
import { FieldEditComponent } from './field-edit.component';
import { FieldOptionsComponent } from './field-options.component';
import { FieldColumnsComponent } from './field-columns.component';

import { SetupService } from './setup.service';

import { CategoryResolver } from './category-resolver.service';
import { FieldResolver } from './field-resolver.service';

@NgModule({
    imports: [ SharedModule, SetupRoutingModule ],
    declarations: [ 
        CategoryListComponent,
        FieldListComponent,
        FieldEditComponent,
        FieldOptionsComponent,
        FieldColumnsComponent
    ],
    providers: [ 
        SetupService,
        CategoryResolver, 
        FieldResolver
    ]
})
export class SetupModule {}