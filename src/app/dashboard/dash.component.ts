import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Filter, PaginatedNotes } from './dash.model';

import { DashService } from './dash.service';

declare let $: any;

@Component({
    templateUrl: './dash.component.html',
    styles: [`
        .ui.text.menu { margin: 0px; }
        .ui.secondary.segment { padding: 0px; }
    `]
})
export class DashComponent implements OnInit, AfterViewInit, OnDestroy {
    notes: PaginatedNotes;
    filters: any[];
    loading: boolean;
    selectedFilter: {class: string | null, field: number | null};
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _dashService: DashService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.filters = [];
            this.filters.push(new Filter('All', null, null));

            const filters_res = data.response.filters;

            // removing CPR for now
            delete filters_res.Cpr;

            for (const filter of Object.keys(filters_res)) {
                this.filters.push( new Filter(filter, filter, filters_res[filter]));
            }

            this.selectedFilter = {class: null, field: null};

            this.getNotes();
        });
    }

    ngAfterViewInit(): void {
        $('.secondary.menu .item').tab({context: 'parent'});
        $('.notes.menu .item').tab();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getNotes(): void {
        let filter;

        if (this.selectedFilter.field !== null) {
            filter = `/${this.selectedFilter.class}/${this.selectedFilter.field}`;
        } else if (this.selectedFilter.class !== null) {
            filter = `/${this.selectedFilter.class}`;
        }

        this.loading = true;

        this._dashService.getNotes(filter)
            .subscribe(notes => this.onNotesRetrieved(notes));
    }

    filterNotes(source_class?: string, field_id?: number): void {
        this.selectedFilter.class = source_class;
        this.selectedFilter.field = field_id;

        this.getNotes();
    }

    nextPage(): void {
        this.loading = true;

        this._dashService.getNotesAtUrl(this.notes.next_page_url)
            .subscribe(notes => this.onNotesRetrieved(notes));
    }

    prevPage(): void {
        this.loading = true;

        this._dashService.getNotesAtUrl(this.notes.prev_page_url)
            .subscribe(notes => this.onNotesRetrieved(notes));
    }

    onNotesRetrieved(notes): void {
        this.loading = false;
        this.notes = notes;
    }

}
