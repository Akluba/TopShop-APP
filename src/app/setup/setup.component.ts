import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SetupService } from './setup.service';

@Component({
    templateUrl: './setup.component.html'
})
export class SetupComponent implements OnInit {
    pageTitle: string;
    data: {};
    apiRoute: string;
    routeParams: {};
    primary;

    constructor(private _route: ActivatedRoute, private _setupService: SetupService) {}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.data = data;

            this.apiRoute = data.apiRoute;
            this.primary = data.response.data.primary;

            this._route.params.subscribe(params => {
                this.routeParams = params;
                const source_class = params['source_class'];
                const pageClass = source_class.charAt(0).toUpperCase() + source_class.slice(1);
                this.pageTitle = `Setup ${pageClass} Fields`;
            });
        });
    }
}
