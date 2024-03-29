import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SHSComponent } from './shs/shs.component';

import { ReportResolver } from './report-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'shs', 
            pathMatch: 'full', 
            component: SHSComponent, 
            resolve: { response: ReportResolver }
        }
        ])
    ],
    exports: [ RouterModule ]
})
export class ReportRoutingModule {}
