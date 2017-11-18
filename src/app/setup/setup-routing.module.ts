import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list.component';
import { FieldListComponent } from './field-list.component';
import { FieldEditComponent } from './field-edit.component';
import { FieldOptionsComponent } from './field-options.component';
import { FieldColumnsComponent } from './field-columns.component';

import { CategoryResolver } from './category-resolver.service';
import { FieldResolver } from './field-resolver.service';


@NgModule({
    imports: [ 
        RouterModule.forChild([
            { path: '', component: CategoryListComponent },
            { 
                path: ':category_id', 
                component: FieldListComponent, 
                resolve: { category: CategoryResolver } 
            },
            {
                path: ':category_id/:field_id',
                component: FieldEditComponent,
                resolve: { field: FieldResolver },
                children: [
                    { path: 'options', component: FieldOptionsComponent },
                    { path: 'columns', component: FieldColumnsComponent }
                ]
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class SetupRoutingModule {}