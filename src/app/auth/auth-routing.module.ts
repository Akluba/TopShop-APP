import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AccountComponent } from './account.component';
import { UsersComponent } from './users.component';

import { AuthGuard } from './auth-guard.service';
import { UsersResolver } from './users-resolver.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'login', component: LoginComponent },
            { path: 'account', canActivate: [ AuthGuard ], component: AccountComponent },
            { path: 'users', canActivate: [ AuthGuard ], resolve: { response: UsersResolver }, component: UsersComponent }
        ])
    ],
    exports: [ RouterModule ]
})
export class AuthRoutingModule {}
