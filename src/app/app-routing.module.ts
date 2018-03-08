import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';
import { ProfileGuard } from './auth/profile-guard.service';

import { UnauthorizedComponent } from './unauthorized.component';
import { PageNotFoundComponent } from './pagenotfound.component';

export const routes: Routes = [
    { path: 'dash', canLoad: [ AuthGuard ], loadChildren: 'app/dashboard/dash.module#DashModule' },
    { path: 'setup', canLoad: [ AuthGuard ], loadChildren: 'app/setup/setup.module#SetupModule' },
    {
        path: 'search',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: 'app/search/search.module#SearchModule',
        data: { authorizedProfiles: ['admin', 'employee'] }
    },
    {
        path: 'shops',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: 'app/shops/shop.module#ShopModule',
        data: { authorizedProfiles: ['admin', 'employee'] }
    },
    {
        path: 'managers',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: 'app/managers/manager.module#ManagerModule',
        data: { authorizedProfiles: ['admin', 'employee'] }
    },
    {
        path: 'vendors',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: 'app/vendors/vendor.module#VendorModule',
        data: { authorizedProfiles: ['admin', 'employee'] }
    },
    {
        path: 'cpr',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: 'app/cpr/cpr.module#CPRModule',
        data: { authorizedProfiles: ['admin', 'cpr'] }
    },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '', redirectTo: 'dash', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
