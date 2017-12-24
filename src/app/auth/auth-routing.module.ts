import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AccountComponent } from './account.component';

import { AuthGuard } from './auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'login', component: LoginComponent },
            { path: 'account', canActivate: [ AuthGuard ], component: AccountComponent }
        ])
    ],
    exports: [ RouterModule ]
})
export class AuthRoutingModule {}
