import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SetupSegmentsComponent } from './setup-segments.component';
import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [ 
        RouterModule.forChild([
            { 
                path: '',
                component: SetupSegmentsComponent,
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'categories',
                    apiRoute:      'category'
                } 
            },
            { 
                path: ':category_id', 
                component: SetupSegmentsComponent, 
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'fields',
                    apiRoute:      'field'
                }
            },
            { 
                path: ':category_id/:field_id/options', 
                component: SetupSegmentsComponent,
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'field-options',
                    apiRoute:      'option'
                } 
            },
            { 
                path: ':category_id/:field_id/columns',
                component: SetupSegmentsComponent,
                resolve: { response: SetupResolver },
                data: {
                    activeSection: 'field-columns',
                    apiRoute:      'column'
                } 
            },
            {
                path: ':category_id/:field_id/:column_id/options',
                component: SetupSegmentsComponent,
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