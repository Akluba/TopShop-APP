import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';
@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html'
})
export class NavComponent {
    constructor(public authService: AuthService, private _router: Router) {}

    logout(): void {
        this.authService.logout()
            .subscribe(
                () => this._router.navigate(['/login'])
            );
    }

}
