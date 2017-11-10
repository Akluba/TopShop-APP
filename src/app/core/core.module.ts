import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth.service';
import { AuthInterceptor } from '../auth/auth.interceptor';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ],
    exports: [ ],
    providers: [ AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
        }
    }
};