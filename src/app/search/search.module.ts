import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { SearchComponent } from './search.component';

import { SearchService } from './search.service';
import { SearchResolver } from './search-resolver.service';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: ':source_class',
                component: SearchComponent,
                resolve: { response: SearchResolver }
            }
        ])
    ],
    declarations: [
        SearchComponent
    ],
    providers: [
        SearchResolver,
        SearchService
    ]
})
export class SearchModule {}
