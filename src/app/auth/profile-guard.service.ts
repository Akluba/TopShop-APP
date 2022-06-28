import { Injectable } from '@angular/core';
import { Router, CanLoad, CanActivate, Route, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';



import { AuthService } from '../core/auth.service';

declare let $: any;

@Injectable()
export class ProfileGuard implements CanLoad, CanActivate {
    private authorizedProfiles: any[];
    private profile: string;

    constructor(private _authService: AuthService, private _router: Router) {}

    canLoad(route: Route): Observable<boolean> {
        this.authorizedProfiles = route.data.authorizedProfiles;
        return this.determineProfileAndCheck();
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        this.authorizedProfiles = route.data.authorizedProfiles;
        return this.determineProfileAndCheck();
    }

    determineProfileAndCheck(): Observable<boolean> {
        if (this._authService.currentUser) {
            this.profile = this._authService.currentUser.profile;
            return of(this.checkProfile());
        }

        return this._authService.getCurrentUser().pipe(
            map(() => {
                this.profile = this._authService.currentUser.profile;
                return this.checkProfile();
            })
        );

        // return this._authService.getCurrentUser()
        //     .map(() => {
        //         this.profile = this._authService.currentUser.profile;
        //         return this.checkProfile();
        //     });
    }

    checkProfile(): boolean {
        if ($.inArray(this.profile, this.authorizedProfiles) !== -1) {
            return true;
        }

        // route them to a can not access screen..
        this._router.navigate(['/unauthorized']);
        return false;
    }
}
