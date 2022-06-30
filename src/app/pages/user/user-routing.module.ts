import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { UsersComponent } from './users.component';

import { AuthGuardService, ProfileGuardService } from '../../shared/services';
import { UsersResolver } from './users-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'account', canActivate: [ AuthGuardService ], component: AccountComponent },
                    {
                        path: 'users',
                        canActivate: [ AuthGuardService, ProfileGuardService ],
                        resolve: { response: UsersResolver },
                        component: UsersComponent,
                        data: { authorizedProfiles: ['superadmin'] }
                    }
                ]
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class UserRoutingModule {}
