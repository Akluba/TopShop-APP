import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SetupComponent } from './setup.component';
import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { 
                path: '',
                component: SetupComponent,
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'categories',
                    apiRoute:      'category'
                } 
            },
            { 
                path: ':category_id', 
                component: SetupComponent, 
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'fields',
                    apiRoute:      'field'
                }
            },
            { 
                path: ':category_id/:field_id/options', 
                component: SetupComponent,
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'field-options',
                    apiRoute:      'option'
                } 
            },
            { 
                path: ':category_id/:field_id/columns',
                component: SetupComponent,
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'field-columns',
                    apiRoute:      'column'
                } 
            },
            {
                path: ':category_id/:field_id/:column_id/options',
                component: SetupComponent,
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'column-options',
                    apiRoute:      'option'
                }
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class SetupRoutingModule {}