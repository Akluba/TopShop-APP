import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';

import { CategoryListComponent } from './category-list.component';

import { SetupService } from './setup.service';

@NgModule({
    imports: [ SharedModule, SetupRoutingModule ],
    declarations: [ CategoryListComponent ],
    providers: [ SetupService ]
})
export class SetupModule {}