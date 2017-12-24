import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  template:
`
<div *ngIf="_authService.isAuthenticated() && _authService.currentUser; then authenticatedUI else login"></div>

<ng-template #login>
  <router-outlet></router-outlet>
</ng-template>

<ng-template #authenticatedUI>
<div class="main ui container">
  <app-nav></app-nav>
  <router-outlet></router-outlet>
</div>
</ng-template>
`
})
export class AppComponent implements OnInit{
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    if (this._authService.isAuthenticated()){
      this._authService.getCurrentUser();
    }

  }

}
