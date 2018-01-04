import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagerListComponent } from './manager-list.component';
import { ManagerDetailsComponent } from './manager-details.component';

import { ManagerListResolver } from './manager-list-resolver.service';
import { ManagerDetailsResolver, ManagerDetailsGuard } from './manager-details.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ManagerListComponent, resolve: { response: ManagerListResolver } },
            {
                path: ':manager_id',
                component: ManagerDetailsComponent,
                resolve: { response: ManagerDetailsResolver },
                canDeactivate: [ ManagerDetailsGuard ],
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class ManagerRoutingModule {}
