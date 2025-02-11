import { Component, HostBinding } from '@angular/core';

import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService, private _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingSubject.next(true);
      }
      if (event instanceof NavigationEnd) {
        this.loadingSubject.next(false);
      }    
    })
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
