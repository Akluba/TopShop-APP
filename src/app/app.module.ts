import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { App1Component } from './app1.component';
import { UnauthorizedComponent } from './unauthorized.component';
import { PageNotFoundComponent } from './pagenotfound.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { NavModule } from './nav/nav.module';
import { AppRoutingModule } from './app-routing.module';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    AuthModule,
    NavModule,
    AppRoutingModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule
  ],
  declarations: [
    AppComponent,
    App1Component,
    UnauthorizedComponent,
    PageNotFoundComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthService, ScreenService, AppInfoService],
  bootstrap: [ App1Component ]
})
export class AppModule {}
