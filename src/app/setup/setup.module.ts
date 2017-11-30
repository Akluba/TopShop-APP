import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';

import { SetupComponent } from './setup.component';
import { CreateComponent } from './create.component'; 
import { BreadcrumbComponent } from './template-breadcrumb.component';
import { FieldTableComponent } from './template-field-table.component';

import { SetupService } from './setup.service';
import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [ SharedModule, SetupRoutingModule ],
    declarations: [
        SetupComponent,
        CreateComponent,
        BreadcrumbComponent,
        FieldTableComponent
    ],
    providers: [ 
        SetupService,
        SetupResolver
    ]
})
export class SetupModule {}