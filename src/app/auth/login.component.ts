import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
import { User } from '../user';

@Component({
  //styleUrls: ['./login.component.css'],
  template: `
    <h1>Login Form</h1>
    <h2>List of users:</h2>
    <ul>
        <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
    `;
})
export class LoginComponent {
    users: User[];
    
    constructor(private authService: AuthService) {
        this.authService.getAccessToken()
            .subscribe(data => {
                this.getUsers(data.access_token)
            });
    }

    getUsers(accessToken: string) {
        this.authService.getUsers(accessToken)
            .subscribe(
                users => {
                    this.users = users;
                    console.log(users);
                });
    }
};