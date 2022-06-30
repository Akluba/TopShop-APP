import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SetupComponent } from './setup.component';
import { SetupResolver } from './setup-resolver.service';
import { ProfileGuardService } from 'src/app/shared/services';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: ':source_class',
                        canActivate: [ ProfileGuardService ],
                        component: SetupComponent,
                        resolve: { response: SetupResolver },
                        data: { apiRoute: 'category', authorizedProfiles: ['superadmin'] },
                    },
                    {
                        path: ':source_class/:category_id',
                        children : [
                            {
                                path: '',
                                canActivate: [ ProfileGuardService ],
                                component: SetupComponent,
                                resolve: { response: SetupResolver },
                                data: { apiRoute: 'field', authorizedProfiles: ['superadmin'] },
                            },
                            {
                                path: ':field_id',
                                canActivate: [ ProfileGuardService ],
                                component: SetupComponent,
                                resolve: { response: SetupResolver },
                                data: { authorizedProfiles: ['superadmin'] },
                            },
                            {
                                path: ':field_id/:column_id',
                                canActivate: [ ProfileGuardService ],
                                component: SetupComponent,
                                resolve: { response: SetupResolver },
                                data: { apiRoute: 'option', authorizedProfiles: ['superadmin'] }
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
