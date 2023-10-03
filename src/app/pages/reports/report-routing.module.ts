import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SHSComponent } from './shs/shs.component';

import { SHSResolver } from './report-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'shs', 
            pathMatch: 'full', 
            component: SHSComponent, 
            resolve: { response: SHSResolver }
        }
        ])
    ],
    exports: [ RouterModule ]
})
export class ReportRoutingModule {}
