import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';

// Feature Components
import { ManagerListComponent } from './manager-list.component';
import { ManagerCreateComponent } from './manager-create.component';
import { ManagerDetailsComponent } from './manager-details.component';

// Services
import { ManagerListResolver } from './manager-list-resolver.service';
import { ManagerDetailsResolver, ManagerDetailsGuard } from './manager-details.service';
import { ManagerService } from './manager.service';
import { ManagerFilterPipe } from './manager-filter.pipe';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        ManagerRoutingModule
    ],
    declarations: [
        ManagerListComponent,
        ManagerCreateComponent,
        ManagerDetailsComponent,
        ManagerFilterPipe
    ],
    providers: [
        ManagerListResolver,
        ManagerDetailsResolver,
        ManagerDetailsGuard,
        ManagerService
    ]
})
export class ManagerModule {}