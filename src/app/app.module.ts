import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './unauthorized.component';
import { PageNotFoundComponent } from './pagenotfound.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { NavModule } from './nav/nav.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    NavModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    PageNotFoundComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
