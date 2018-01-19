import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

declare let $: any;

class Filter {
    private title: string;
    private primary: string;
    private sub: any[];

    constructor(title, primary, sub) {
        this.title = title;
        this.primary = primary;
        this.sub = sub;
    }
}

@Component({
    templateUrl: './dash.component.html',
    styles: [`
        .ui.text.menu { margin: 0px; }
        .ui.secondary.segment { padding: 0px; }
    `]
})
export class DashComponent implements OnInit, AfterViewInit, OnDestroy {
    notes: any[];
    filters: any[];
    selectedFilter: {};
    private sub: Subscription;
    constructor (private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.notes = data.response.notes;
            this.filters = [ new Filter('All', null, null) ];

            this.selectedFilter = {class: null, field_id: null};

            const filters = data.response.filters;
            for (const filter of Object.keys(filters)) {
                this.filters.push( new Filter(filter, filter, filters[filter]) );
            }

        });
    }

    ngAfterViewInit(): void {
        $('.secondary.menu .item').tab({context: 'parent'});
        $('.notes.menu .item').tab();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    changeFilter(fClass, fFiled): void {
        this.selectedFilter = {class: fClass, field: fFiled};
    }

}
