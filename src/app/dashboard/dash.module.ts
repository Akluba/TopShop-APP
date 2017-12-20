import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// Feature Components
import { DashComponent } from './dash.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: DashComponent },
        ])
    ],
    declarations: [
        DashComponent
    ],
    providers: [

    ]
})
export class DashModule {};