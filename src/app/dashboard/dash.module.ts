import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// Feature Components
import { DashComponent } from './dash.component';

import { DashService, DashResolver } from './dash.service';
import { NoteFilterPipe } from './note-filter.pipe';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashComponent,
                resolve: {response: DashResolver}
            },
        ])
    ],
    declarations: [
        DashComponent,
        NoteFilterPipe
    ],
    providers: [
        DashService,
        DashResolver
    ]
})
export class DashModule {}
