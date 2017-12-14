import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SetupComponent } from './setup.component';
import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: ':source_class',
                        component: SetupComponent,
                        resolve: { response: SetupResolver },
                        data: { apiRoute: 'category' },
                    },
                    {
                        path: ':source_class/:category_id',
                        children : [
                            {
                                path: '',
                                component: SetupComponent,
                                resolve: { response: SetupResolver },
                                data: { apiRoute: 'field' },
                            },
                            {
                                path: ':field_id',
                                component: SetupComponent,
                                resolve: { response: SetupResolver }
                            },
                            {
                                path: ':field_id/:column_id',
                                component: SetupComponent,
                                resolve: { response: SetupResolver },
                                data: { apiRoute: 'option' }
                            },
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class SetupRoutingModule {}