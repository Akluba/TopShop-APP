import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './company-routing.module';

// Feature Components
import { CompanyListComponent } from './company-list.component';
import { CompanyDetailsComponent } from './company-details.component';

// Services
import { CompanyService } from './company.service';
import { CompanyListResolver, CompanyDetailsResolver } from './company-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        CompanyRoutingModule
    ],
    declarations: [
        CompanyListComponent,
        CompanyDetailsComponent
    ],
    providers: [
        CompanyService,
        CompanyListResolver,
        CompanyDetailsResolver
    ]
})
export class CompanyModule {}
