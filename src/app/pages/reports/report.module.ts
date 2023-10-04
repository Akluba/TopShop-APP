import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReportRoutingModule } from './report-routing.module';
import { DxDataGridModule } from 'devextreme-angular';

// Feature Components
import { SHSComponent } from './shs/shs.component';
import { DetailViewComponent } from './shs/detail-view.component';

// Services
import { ReportService } from './report.service';
import { SHSResolver } from './report-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        ReportRoutingModule,
        DxDataGridModule
    ],
    declarations: [
        SHSComponent,
        DetailViewComponent
    ],
    providers: [
        ReportService,
        SHSResolver
    ]
})
export class ReportModule {}
