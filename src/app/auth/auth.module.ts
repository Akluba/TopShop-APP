import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AccountComponent } from './account.component';
import { UsersComponent } from './users.component';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthGuard } from './auth-guard.service';
import { ProfileGuard } from './profile-guard.service';
import { UsersResolver } from './users-resolver.service';
import { UserService } from './user.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    declarations: [
        LoginComponent,
        AccountComponent,
        UsersComponent
    ],
    providers: [
        AuthGuard,
        ProfileGuard,
        UsersResolver,
        UserService
    ]
})
export class AuthModule {}
