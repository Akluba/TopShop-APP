import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';

import { AuthService } from '../core/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private _authService: AuthService, private _router: Router) {}

    canActivate(): boolean {
        return this.checkAuthenticated();
    }

    canLoad(): boolean {
        return this.checkAuthenticated();
    }

    checkAuthenticated(): boolean {
        if (this._authService.isAuthenticated()) {
            return true;
        }

        this._router.navigate(['/login']);
        return false;
    }
}
