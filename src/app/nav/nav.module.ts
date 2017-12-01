import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { NavComponent } from './nav.component';

@NgModule({
    imports      : [ SharedModule, RouterModule ],
    declarations : [ NavComponent ],
    exports      : [ NavComponent ]
})
export class NavModule {};