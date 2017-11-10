import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}