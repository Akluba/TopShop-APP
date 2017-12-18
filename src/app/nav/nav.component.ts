import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html'
})
export class NavComponent implements OnInit{
    user;
    constructor(private _authService: AuthService, private _router: Router) {}

    ngOnInit(): void {
        this.user = this._authService.currentUser;
    }

    logout(): void {
        this._authService.logout()
            .subscribe(
                () => this._router.navigate(['/login'])
            );
    }

}