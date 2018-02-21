import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

declare let $: any;

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html',
    styles: [
        `
            .ui.sidebar { overflow: visible !important; }
        `
    ]
})
export class NavComponent implements AfterViewInit {
    constructor(public authService: AuthService, private _router: Router) {}

    ngAfterViewInit(): void {
        $('.dropdown').dropdown();
    }

    logout(): void {
        this.authService.logout()
            .subscribe(
                () => this._router.navigate(['/login'])
            );
    }

}
