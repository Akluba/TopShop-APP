import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    updatedSortOrder = false;

    sourceClassTabs: any;

    constructor(private _route: ActivatedRoute, private _router: Router, public setupService: SetupService) {}

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

        this.sourceClassTabs = {
            height: '30px',
            label: 'Manage Fields:',
            items: ['shop','manager','vendor'],
            selectedItem: this.routeParams['source_class'],
            onItemClick: (e) => { this._router.navigate(['/setup/', e.itemData]) }
          };
    }

    toggleSortState(): void {
        if (this.sorting && this.updatedSortOrder) {
            this.updateSortOrder();
            this.updatedSortOrder = false;
        }

        this.sorting = !this.sorting;
    }

    updateSortOrder(): void {
        const children = this.setupService.children;
        for (let i = 0; i < children.length; i++) {
            children[i].sort_order = i;
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
