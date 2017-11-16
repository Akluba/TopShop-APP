import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list.component';
import { FieldListComponent } from './field-list.component';

import { FieldResolver } from './field-resolver.service';


@NgModule({
    imports: [ 
        RouterModule.forChild([
            { path: '', component: CategoryListComponent },
            { 
                path: ':category_id', 
                component: FieldListComponent, 
                resolve: { category: FieldResolver } 
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class SetupRoutingModule {}