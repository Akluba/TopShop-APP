import { Component, OnInit, Input } from '@angular/core';

import { SetupService } from './setup.service';

declare var $: any;

@Component({
    selector: 'app-setup-table',
    templateUrl: 'setup-table.component.html',
    styles: [
        `
            .non-edit-text { font-style: oblique; }
            .edit-text { border-bottom: 1px dotted #00F; }
        `
    ]
})
export class SetupTableComponent implements OnInit {
    @Input() data;

    columns: any[];

    constructor(public setupService: SetupService) {}

    ngOnInit(): void {
        this.columns = [
            { field: 'source_class', header: 'Section', edit: false },
            { field: 'title', header: 'Title', edit: true },
            { field: 'sort_order', header: 'Sort Order', edit: true }
        ];
    }
}
