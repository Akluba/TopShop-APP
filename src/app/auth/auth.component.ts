import { Component } from '@angular/core';

import { AuthService } from '../core/auth.service';

@Component({
  styleUrls: ['./auth.component.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
    loginModal: boolean = false;
    credentials: any = {};
    authError: String;

    constructor(private auth:AuthService) {}
    
    login(credentials) {
        this.authError = null;
        this.auth
            .login(credentials)
            .then(result => console.log(result))
            .catch(error => this.authError = error);
    }

    logout() {
        this.auth.logout()
        .then(result => {
            console.log(result);
            this.loginModal = false;
        })
        .catch(error => console.log(error));
    }

}