import { NgModule }      from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        ReactiveFormsModule, 
        FormsModule, 
        SharedModule, 
        RouterModule.forChild([
            { path: 'login', component: LoginComponent }
        ])
    ],
    declarations: [ LoginComponent ],
    exports: [ ],
    providers: [ ]
})
export class AuthModule { };