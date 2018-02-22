import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CPRListComponent } from './cpr-list.component';
import { CPRDetailsComponent } from './cpr-details.component';

import { CPRListResolver } from './cpr-resolve.service';
import { CPRDetailsResolver } from './cpr-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CPRListComponent, resolve: {response: CPRListResolver } },
            {
                path: ':cpr_id',
                component: CPRDetailsComponent,
                resolve: { response: CPRDetailsResolver },
                data: { source_class: 'Cpr' }
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class CPRRoutingModule {}
