import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { AccountComponent } from './account.component';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthGuard } from './auth-guard.service';
import { UserService } from './user.service';

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule
    ],
    declarations: [
        LoginComponent,
        AccountComponent
    ],
    providers: [
        AuthGuard,
        UserService
    ]
})
export class AuthModule {}