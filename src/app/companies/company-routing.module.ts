import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CompanyListComponent } from './company-list.component';
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyRequirementsComponent } from './company-requirements.component';

import { CompanyListResolver, CompanyDetailsResolver, CompanyRequirementsResolver } from './company-resolve.service';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: CompanyListComponent, resolve: { response: CompanyListResolver } },
            {
                path: ':company_id',
                component: CompanyDetailsComponent,
                resolve: { response: CompanyDetailsResolver },
                data: { source_class: 'Company' }
            },
            {
                path: ':company_id/requirements',
                component: CompanyRequirementsComponent,
                resolve: { response: CompanyRequirementsResolver },
            }
        ])
    ],
    exports: [ RouterModule ]
})
export class CompanyRoutingModule {}
