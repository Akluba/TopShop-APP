import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';

import { UnauthorizedComponent } from './unauthorized.component';
import { PageNotFoundComponent } from './pagenotfound.component';

export const routes: Routes = [
    { path: 'dash', canLoad: [ AuthGuard ], loadChildren: 'app/dashboard/dash.module#DashModule' },
    { path: 'setup', canLoad: [ AuthGuard ], loadChildren: 'app/setup/setup.module#SetupModule' },
    { path: 'shops', canLoad: [ AuthGuard ], loadChildren: 'app/shops/shop.module#ShopModule' },
    { path: 'managers', canLoad: [ AuthGuard ], loadChildren: 'app/managers/manager.module#ManagerModule' },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '', redirectTo: 'dash', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}