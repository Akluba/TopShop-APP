import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';

import { SetupSegmentsComponent } from './setup-segments.component';
import { BreadcrumbComponent } from './template-breadcrumb.component';
import { ActionItemsComponent } from './setup-action-items.component';

import { SetupService } from './setup.service';
import { SetupResolver } from './setup-resolver.service';

@NgModule({
    imports: [ SharedModule, SetupRoutingModule ],
    declarations: [
        SetupSegmentsComponent,
        BreadcrumbComponent,
        ActionItemsComponent
    ],
    providers: [ 
        SetupService,
        SetupResolver
    ]
})
export class SetupModule {}