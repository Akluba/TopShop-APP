import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
    credentials: any = {};
    authError: String;

    constructor(private router:Router, private authService:AuthService) { }

    login(credentials) {
        this.authError = null;
        this.authService
            .login(credentials)
            .then(result => console.log(result))
            .catch(error => this.authError = error)
    }
    
}