import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-fields-table',
    templateUrl: 'fields-table.component.html',
    styles: []
})
export class FieldsTableComponent implements OnInit {
    @Input() dataSource;

    @Input() data;

    @Output() reorder = new EventEmitter<any>();

    ngOnInit(): void {

    }

    trackByFn(index, item) {
        return item.id;
    }

    onListReorder(e) {
        const list = this.data.splice(e.fromIndex, 1)[0];
        this.data.splice(e.toIndex, 0, list);
    }

    onReorder = (e) => {
        this.reorder.emit(e);
    }
}