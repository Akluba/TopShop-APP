import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { ICurrentUser } from '../auth/currentUser';

@Component({
    styles: [
        `
        .grid { height: 100%; background-color: #212a40; }
        .grid .column { max-width: 450px; }
        .ui.header img { width: auto; }
        .button { background-color: #7e8aa2; color: white; }
        .button:hover { background-color: #667084; color: white; }
        `
    ],
    templateUrl: './login.component.html'
})
export class LoginComponent {
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