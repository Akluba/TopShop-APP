import { Component } from '@angular/core';
//import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../core/auth.service';

@Component({
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
    credentials: any = {};
    authError: String;

    constructor(private auth:AuthService) { }

    login(credentials) {
        this.authError = null;
        this.auth
            .login(credentials)
            .then(result => console.log(result))
            .catch(error => this.authError = error)
    }
    
}