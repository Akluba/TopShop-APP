import { Component, Input, OnInit } from '@angular/core';

import { Column } from './Column';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit {
    @Input() fields: any[];
    @Input() data: any[];
    tableColumns = [];
    toggleColumns = [];
    selectedData: any[];

    ngOnInit(): void {
        this.setTableColumns();
        this.setToggleColumns();
    }

    setTableColumns(): void {
        for (const field of Object.keys(this.fields)) {
            this.tableColumns.push( new Column(
                field,
                this.fields[field]['title'],
                this.fields[field]['type'],
                this.fields[field]['options'],
            ));
        }
    }

    setToggleColumns(): void {
        for (let i = 0; i < this.tableColumns.length; i++) {
            this.toggleColumns.push({label: this.tableColumns[i].header, value: this.tableColumns[i]});
        }
    }

    testing(value): void {
        console.log(value);
    }
}
