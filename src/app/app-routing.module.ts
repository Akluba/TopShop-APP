import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'setup', loadChildren: 'app/setup/setup.module#SetupModule' },
    { path: 'shops', loadChildren: 'app/shops/shop.module#ShopModule' }
    //{ path: '', redirectTo: 'home', pathMatch: 'full'},
    //{ path: '**' component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}