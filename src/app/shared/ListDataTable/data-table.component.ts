import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Element, Column } from './Classes';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit {
    @Input() fields: any[];
    @Input() data: any[];
    @Input() type: string;
    @Output() elementCreated = new EventEmitter<any>();
    @Output() elementRemoved = new EventEmitter<any>();
    tableColumns = [];
    selectedColumns = [];
    boolOptions: any[];
    newElement: Element;
    newPlaceholder: string;
    selectedData: any[];

    ngOnInit(): void {
        this.setTableColumns();
        this.newElement = new Element();
        this.newPlaceholder = `Enter a New ${this.type} Name`;

        this.boolOptions = [
            {label: 'True', value: 'true'},
            {label: 'False', value: 'false'}
        ];
    }

    setTableColumns(): void {
        this.tableColumns.push(new Column('name', 'Name', 'text', undefined));

        for (const field of Object.keys(this.fields)) {
            this.tableColumns.push( new Column(
                field,
                this.fields[field]['title'],
                this.fields[field]['type'],
                this.fields[field]['options'],
            ));
        }

        this.selectedColumns = this.tableColumns;
    }

    create(): void {
        if (this.newElement.name) {
            this.elementCreated.emit(this.newElement);
            this.newElement = new Element();
        }
    }

    remove(data): void {
        if (confirm(`Are you sure you want to delete: ${data.name}?`)) {
            this.elementRemoved.emit(data.id);
        }
    }

    testing(value, field): void {
        console.log(field);
        console.log(value);
    }
}
