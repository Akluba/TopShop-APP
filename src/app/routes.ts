import { Routes } from '@angular/router';

export const appRoutes : Routes = [
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule'}
];