import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './company-routing.module';

// Feature Components
import { CompanyListComponent } from './company-list.component';
import { CompanyDetailsComponent } from './company-details.component';
import { CompanyRequirementsComponent } from './company-requirements.component';

// Services
import { CompanyService, CompanyRequirementsService } from './company.service';
import { CompanyListResolver, CompanyDetailsResolver, CompanyRequirementsResolver } from './company-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CompanyRoutingModule
    ],
    declarations: [
        CompanyListComponent,
        CompanyDetailsComponent,
        CompanyRequirementsComponent
    ],
    providers: [
        CompanyService,
        CompanyRequirementsService,
        CompanyListResolver,
        CompanyDetailsResolver,
        CompanyRequirementsResolver
    ]
})
export class CompanyModule {}
