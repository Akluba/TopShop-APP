import { Component } from '@angular/core';

import { AuthService } from '../core/auth.service';
import { ICurrentUser } from '../auth/currentUser';

@Component({
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
    loginModal: boolean = false;
    credentials: any = {};
    pageError: String;
    currentUser: ICurrentUser;

    constructor(private _auth:AuthService) {}
    
    login(credentials) {
        this.pageError = null;
        this._auth
            .login(credentials)
            .subscribe(
                null,
                err => this.pageError = err,
                () => console.log('route to /dash')
            );
    }

    logout() {
        this._auth
            .logout()
            .subscribe(
                res => {
                    console.log(res)
                    this.loginModal = false;
                },
                err => console.log(err)
            );
    }

}