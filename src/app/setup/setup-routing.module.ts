import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list.component';
import { FieldListComponent } from './field-list.component';
import { FieldEditComponent } from './field-edit.component';
import { FieldOptionsComponent } from './field-options.component';
import { FieldColumnsComponent } from './field-columns.component';
import { ColumnOptionsComponent } from './column-options.component';

import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { path: '', component: CategoryListComponent, data: {route: 'category'} },
            { 
                path: ':category_id', 
                component: FieldListComponent, 
                resolve: { category: SetupResolver },
                data: {route: 'field'}
            },
            {
                path: ':category_id/:field_id',
                component: FieldEditComponent,
                resolve: { field: SetupResolver },
                children: [
                    { path: 'options', component: FieldOptionsComponent, data: {route: 'option'} },
                    { path: 'columns', component: FieldColumnsComponent, data: {route: 'column'} }
                ]
            },
            {
                path: ':category_id/:field_id/:column_id/options',
                component: ColumnOptionsComponent,
                resolve: { column: SetupResolver },
                data: {route: 'option'}
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class SetupRoutingModule {}