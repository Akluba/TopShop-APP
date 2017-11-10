import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthComponent } from './auth.component';

@NgModule({
    imports: [RouterModule.forChild([
            { path: '', component: AuthComponent },
    ])],
    exports: [ RouterModule ]
})
export class AuthRoutingModule {}
