import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnauthorizedComponent } from './unauthorized.component';
import { PageNotFoundComponent } from './pagenotfound.component';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService, ProfileGuardService } from './shared/services';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';

export const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  { path: 'user', canLoad: [ AuthGuardService ], loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
  { path: 'dash', canLoad: [ AuthGuardService ], loadChildren: () => import('./pages/dash/dash.module').then(m => m.DashModule)},
  {
    path: 'setup',
    canLoad: [ AuthGuardService, ProfileGuardService ],
    loadChildren: () => import('./pages/setup/setup.module').then(m => m.SetupModule),
    data: { authorizedProfiles: ['superadmin'] }
  },
  {
      path: 'search',
      canLoad: [ AuthGuardService ],
      loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'accounts',
    canLoad: [ AuthGuardService ],
    loadChildren: () => import('./pages/shops/accounts/account.module').then(m => m.AccountModule)
  },
  {
      path: 'shops',
      canLoad: [ AuthGuardService ],
      loadChildren: () => import('./pages/shops/shops/shop.module').then(m => m.ShopModule)
  },
  {
      path: 'managers',
      canLoad: [ AuthGuardService ],
      loadChildren: () => import('./pages/insurers/manager.module').then(m => m.ManagerModule)
  },
  {
      path: 'vendors',
      canLoad: [ AuthGuardService ],
      loadChildren: () => import('./pages/vendors/vendor.module').then(m => m.VendorModule)
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: 'dash', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), DxDataGridModule, DxFormModule ],
    exports: [ RouterModule ],
    providers: [
      AuthGuardService,
      ProfileGuardService
    ],
    declarations: [
      ProfileComponent,
      TasksComponent
    ]
})
export class AppRoutingModule {}
