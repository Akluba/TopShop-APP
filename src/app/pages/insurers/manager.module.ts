import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagerRoutingModule } from './manager-routing.module';

// Feature Components
import { ManagerListComponent } from './manager-list.component';
import { ManagerDetailsComponent } from './manager-details.component';

// Services
import { ManagerService } from './manager.service';
import { ManagerListResolver, ManagerDetailsResolver } from './manager-resolve.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ManagerRoutingModule
    ],
    declarations: [
        ManagerListComponent,
        ManagerDetailsComponent
    ],
    providers: [
        ManagerService,
        ManagerListResolver,
        ManagerDetailsResolver
    ]
})
export class ManagerModule {}
