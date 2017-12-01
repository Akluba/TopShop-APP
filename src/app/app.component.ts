import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet>
      <app-nav *ngIf="true"></app-nav>
    </router-outlet>
  `
})
export class AppComponent {};
