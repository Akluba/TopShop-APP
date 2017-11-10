import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { AuthService } from '../core/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private _auth: AuthService, private _router: Router){}

    canActivate(): boolean
    {
        if (!this._auth.isAuthenticated()) {
            this._router.navigate(['auth/login']);
            return false;
        }
        return true;
    }
}