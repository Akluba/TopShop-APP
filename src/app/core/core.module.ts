import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from './auth.service';

@NgModule({
    imports: [ 
        CommonModule, 
        RouterModule 
    ],
    exports: [ ],
    declarations: [ ],
    providers: [ AuthService ]
})
export class CoreModule {};