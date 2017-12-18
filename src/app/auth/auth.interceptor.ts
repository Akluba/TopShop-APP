import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (private _inject: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authService = this._inject.get(AuthService);

        const authHeader = `Bearer ${authService.retrieveAccessToken()}`;

        const authReq = req.clone({headers: req.headers.set('Authorization', authHeader)});

        return next.handle(authReq);
    }
}