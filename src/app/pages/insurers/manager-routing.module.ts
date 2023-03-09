import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagerListComponent } from './manager-list.component';
import { ManagerDetailsComponent } from './manager-details.component';

import { ManagerListResolver, ManagerDetailsResolver, MarketingEffortsResolver } from './manager-resolve.service';
import { MarketingEffortsComponent } from './marketing efforts/marketing-efforts.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ManagerListComponent, resolve: { response: ManagerListResolver } },
            { path: 'efforts', pathMatch: 'full', component: MarketingEffortsComponent, resolve: { response: MarketingEffortsResolver }},
            {
                path: ':manager_id',
                component: ManagerDetailsComponent,
                resolve: { response: ManagerDetailsResolver },
                data: { source_class: 'Manager' }
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class ManagerRoutingModule {}
