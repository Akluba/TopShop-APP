import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list.component';

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { path: '', component: CategoryListComponent }
        ])
    ],
    exports: [ RouterModule ]
})
export class SetupRoutingModule {}