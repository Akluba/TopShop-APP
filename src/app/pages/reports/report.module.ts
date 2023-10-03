import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReportRoutingModule } from './report-routing.module';

// Feature Components
import { SHSComponent } from './shs/shs.component'

// Services
import { ReportService } from './report.service';
import { SHSResolver } from './report-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        ReportRoutingModule
    ],
    declarations: [
        SHSComponent
    ],
    providers: [
        ReportService,
        SHSResolver
    ]
})
export class ReportModule {}
