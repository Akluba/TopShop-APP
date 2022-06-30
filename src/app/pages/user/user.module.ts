import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountComponent } from './account.component';
import { UsersComponent } from './users.component';

import { UserRoutingModule } from './user-routing.module';

import { UsersResolver } from './users-resolver.service';
import { UserService } from './user.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule
    ],
    declarations: [
        AccountComponent,
        UsersComponent
    ],
    providers: [
        UsersResolver,
        UserService
    ]
})
export class UserModule {}
