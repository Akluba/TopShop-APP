import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { ICurrentUser } from '../auth/currentUser';

@Component({
  templateUrl: './auth.component.html'
})
export class AuthComponent {
    loginModal: boolean = false;
    credentials: any = {};
    pageError: String;
    currentUser: ICurrentUser;

    constructor(private _authService:AuthService, private _router: Router) {}

    login(credentials) {
        this.pageError = null;
        this._authService.login(credentials)
            .subscribe(
                null,
                err => this.pageError = err,
                () => this._router.navigate(['/dash'])
            );
    }

}