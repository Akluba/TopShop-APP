import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SearchService } from './search.service';

@Injectable()
export class SearchResolver implements Resolve<any> {
    constructor(private _searchService: SearchService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const source_class = route.params['source_class'];

        return this._searchService.index(source_class);
    }
}
