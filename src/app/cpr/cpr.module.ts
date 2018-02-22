import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CPRRoutingModule } from './cpr-routing.module';

// Feature Components
import { CPRListComponent } from './cpr-list.component';
import { CPRDetailsComponent } from './cpr-details.component';

// Services
import { CPRService } from './cpr.service';
import { CPRListResolver, CPRDetailsResolver } from './cpr-resolve.service';

import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        SharedModule,
        TableModule,
        FormsModule,
        CPRRoutingModule
    ],
    declarations: [
        CPRListComponent,
        CPRDetailsComponent
    ],
    providers: [
        CPRService,
        CPRListResolver,
        CPRDetailsResolver
    ]
})
export class CPRModule {}
