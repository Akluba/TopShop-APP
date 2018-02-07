import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { VendorRoutingModule } from './vendor-routing.module';

// Feature Components
import { VendorListComponent } from './vendor-list.component';

// Services
import { VendorService } from './vendor.service';
import { VendorListResolver } from './vendor-resolve.service';

import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        SharedModule,
        TableModule,
        FormsModule,
        VendorRoutingModule
    ],
    declarations: [
        VendorListComponent
    ],
    providers: [
        VendorService,
        VendorListResolver
    ]
})
export class VendorModule {}
