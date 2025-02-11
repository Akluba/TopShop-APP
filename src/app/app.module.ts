import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized.component';
import { PageNotFoundComponent } from './pagenotfound.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { DxLoadPanelModule } from 'devextreme-angular';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    DxLoadPanelModule
  ],
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    PageNotFoundComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService, ScreenService, AppInfoService],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
