import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';
import { ProfileGuard } from './auth/profile-guard.service';

import { UnauthorizedComponent } from './unauthorized.component';
import { PageNotFoundComponent } from './pagenotfound.component';

export const routes: Routes = [
    { path: 'dash', canLoad: [ AuthGuard ], loadChildren: 'app/dashboard/dash.module#DashModule' },
    { path: 'setup', canLoad: [ AuthGuard ], loadChildren: 'app/setup/setup.module#SetupModule' },
<<<<<<< HEAD
    { path: 'search', canLoad: [ AuthGuard ], loadChildren: 'app/search/search.module#SearchModule' },
    { path: 'shops', canLoad: [ AuthGuard ], loadChildren: 'app/shops/shop.module#ShopModule' },
    { path: 'managers', canLoad: [ AuthGuard ], loadChildren: 'app/managers/manager.module#ManagerModule' },
    { path: 'vendors', canLoad: [ AuthGuard ], loadChildren: 'app/vendors/vendor.module#VendorModule' },
=======
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
>>>>>>> origin/enhance_6
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '', redirectTo: 'dash', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
