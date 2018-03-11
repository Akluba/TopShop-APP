import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

import { ICurrentUser } from '../auth/currentUser';
import { MenuItem, NavLink} from './NavClasses';

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
export class NavComponent implements OnInit, AfterViewInit {
    user: ICurrentUser;
    userMenuItems: any[];
    constructor(private _authService: AuthService, private _router: Router) {}

    ngOnInit(): void {
        this.user = this._authService.currentUser;
        this.setMenu();
    }

    ngAfterViewInit(): void {
        $('.dropdown').dropdown();
    }

    setMenu(): void {
        this.userMenuItems = [
            new MenuItem('Shops', [
                new NavLink(['/shops'], 'Shop List'),
                new NavLink(['/search/shop'], 'Advanced Search'),
                new NavLink(['/setup/shop'], 'Setup'),
            ], this.checkUserPermission(['admin', 'employee'])),
            new MenuItem('Insurance Companies', [
                new NavLink(['/managers'], 'Manager List'),
                new NavLink(['/search/manager'], 'Advanced Search'),
                new NavLink(['/setup/manager'], 'Setup'),
            ], this.checkUserPermission(['admin', 'employee'])),
            new MenuItem('Vendors', [
                new NavLink(['/vendors'], 'Vendor List'),
                new NavLink(['/search/vendor'], 'Advanced Search'),
                new NavLink(['/setup/vendor'], 'Setup'),
            ], this.checkUserPermission(['admin', 'employee'])),
            new MenuItem('CPR', [
                new NavLink(['/cpr'], 'Contact List'),
                new NavLink(['/search/cpr'], 'Advanced Search'),
                new NavLink(['/setup/cpr'], 'Setup'),
            ], this.checkUserPermission(['admin', 'cpr']))
        ];
    }

    checkUserPermission(profiles: any[]): boolean {
        return $.inArray(this.user.profile, profiles) !== -1;
    }

    logout(): void {
        this._authService.logout()
            .subscribe(
                () => this._router.navigate(['/login'])
            );
    }

}
