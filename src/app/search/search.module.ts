import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

import { SearchComponent } from './search.component';
import { AdvSearchStepComponent } from './search-step.component';
import { SearchResultsComponent } from './search-results.component';

import { SearchService } from './search.service';
import { SearchResolver } from './search-resolver.service';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        MultiSelectModule,
        RouterModule.forChild([
            {
                path: ':source_class',
                component: SearchComponent,
                resolve: { response: SearchResolver }
            }
        ])
    ],
    declarations: [
        SearchComponent,
        AdvSearchStepComponent,
        SearchResultsComponent
    ],
    providers: [
        SearchResolver,
        SearchService
    ]
})
export class SearchModule {}
