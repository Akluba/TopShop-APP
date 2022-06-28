import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';
import { ProfileGuard } from './auth/profile-guard.service';

import { UnauthorizedComponent } from './unauthorized.component';
import { PageNotFoundComponent } from './pagenotfound.component';

export const routes: Routes = [
    { path: 'dash', canLoad: [ AuthGuard ], loadChildren: () => import('./dashboard/dash.module').then(m => m.DashModule)},
    { path: 'setup', canLoad: [ AuthGuard ], loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)},

    {
        path: 'search',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: () => import('./search/search.module').then(m => m.SearchModule),
        data: { authorizedProfiles: ['admin', 'employee'] }
    },
    {
        path: 'shops',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: () => import('./shops/shop.module').then(m => m.ShopModule),
        data: { authorizedProfiles: ['admin', 'employee'] }
    },
    {
        path: 'managers',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: () => import('./managers/manager.module').then(m => m.ManagerModule),
        data: { authorizedProfiles: ['admin', 'employee'] }
    },
    {
        path: 'vendors',
        canLoad: [ AuthGuard, ProfileGuard ],
        loadChildren: () => import('./vendors/vendor.module').then(m => m.VendorModule),
        data: { authorizedProfiles: ['admin', 'employee'] }
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
