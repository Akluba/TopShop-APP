import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from './auth-guard.service';

@NgModule({
    imports: [ SharedModule, AuthRoutingModule ],
    declarations: [ AuthComponent ],
    providers: [ AuthGuard ]
})
export class AuthModule {}