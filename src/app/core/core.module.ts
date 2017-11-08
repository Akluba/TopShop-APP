import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';

@NgModule({
    imports: [ 
        CommonModule, 
        RouterModule,
        HttpClientModule 
    ],
    exports: [ ],
    declarations: [ ],
    providers: [ AuthService ]
})
export class CoreModule {};