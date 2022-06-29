import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/auth.service';

@Component({
  selector: '-root',
  template:
`
<div *ngIf="authService.isAuthenticated() && authService.currentUser; then authenticatedUI else login"></div>

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
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.getCurrentUser().subscribe();
    }

  }

}
