import { Component, Input, OnInit } from '@angular/core';

import { Column } from '../../shared/ListDataTable/Classes';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {
    @Input() searchResponse: {matches: any[], columns: any[]};
    @Input() sourceClass: string;
    matches: any[];
    columns: any[];
    tableColumns = [];
    selectedColumns = [];
    boolOptions: any[];
    selectedData: any[];

    ngOnInit(): void {
        this.sourceClass = (this.sourceClass === 'cpr') ? this.sourceClass : this.sourceClass + 's';
        this.matches = this.searchResponse.matches;
        this.columns = this.searchResponse.columns;
        this.setTableColumns();

        this.boolOptions = [
            {label: 'True', value: 'true'},
            {label: 'False', value: 'false'}
        ];
    }

    setTableColumns(): void {
        this.tableColumns.push(new Column('name', 'Name', 'text', undefined));

        for (const column of Object.keys(this.columns)) {
            this.tableColumns.push( new Column(
                column,
                this.columns[column]['title'],
                this.columns[column]['type'],
                this.columns[column]['options'],
            ));
        }

        this.selectedColumns = this.tableColumns;
    }
}
