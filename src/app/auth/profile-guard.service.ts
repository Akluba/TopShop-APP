import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { AuthService } from '../core/auth.service';

@Injectable()
export class ProfileGuard implements CanActivate {
    private authorized: string;
    private profile: string;

    constructor(private _authService: AuthService, private _router: Router){}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.authorized = route.data.authorizedProfile;

        if (this._authService.currentUser) {
            this.profile = this._authService.currentUser.profile;
            return Observable.of(this.checkProfile());
        }

        return this._authService.getCurrentUser()
            .map(() => {
                this.profile = this._authService.currentUser.profile;
                return this.checkProfile();
            })

    }

    checkProfile(): boolean {
        if (this.profile !== this.authorized) {
            // route them to a can not access screen..
            this._router.navigate(['/unauthorized']);
            return false;
        }

        return true;
    }

}