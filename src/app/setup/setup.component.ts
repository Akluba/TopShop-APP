import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SetupService } from './setup.service';

declare var $: any;

@Component({
    templateUrl: './setup.component.html'
})
export class SetupComponent implements OnInit {
    pageTitle: string;
    data: {};
    apiRoute: string;
    routeParams: {};
    primary;
    sorting = false;

    constructor(private _route: ActivatedRoute, public setupService: SetupService) {}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.data = data;

            this.apiRoute = data.apiRoute;

            this.primary = data.response.data.primary;
            if (this.apiRoute === undefined) {
                this.apiRoute = ($.inArray(this.primary.type, ['log', 'notes']) !== -1) ? 'column' : 'option';
            }

            this._route.params.subscribe(params => {
                this.routeParams = params;
                const source_class = params['source_class'];
                const pageClass = source_class.charAt(0).toUpperCase() + source_class.slice(1);
                this.pageTitle = `Setup ${pageClass} Fields`;
            });
        });
    }

    toggleSortState(): void {
        this.sorting = !this.sorting;
    }

    updateSortOrder(): void {
        const children = this.setupService.children;
        for (let i = 0; i < children.length; i++) {
            children[i].sort_order = i + 1;
        }

        const body = {
            mass: true,
            id: 0,
            data: children
        };

        this.setupService.save(body, this.apiRoute)
            .subscribe();
    }
}
