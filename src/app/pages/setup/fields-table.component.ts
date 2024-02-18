import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';

@Component({
    selector: 'app-fields-table',
    templateUrl: 'fields-table.component.html',
    styles: []
})
export class FieldsTableComponent implements OnInit {
    @Input() dataSource;

    @Input() data;

    @Output() reorder = new EventEmitter<any>();

    categoryOptions: Object;
    options: any = [];
    columns: any = [];

    ngOnInit(): void {
        this.categoryOptions = {
            dataSource: new DataSource({
                store: new ArrayStore({
                    key: "id",
                    data: this.data
                })
            }),
            valueExpr: 'id',
            displayExpr: 'title'
        };
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

    onEditingStart(e: any) {
        if(e.data.columns?.length > 0)
            this.columns = e.data.columns;

        if(e.data.options?.length > 0)
            this.options = e.data.options;
    }

    onRowPrepared(e) {
        if (e.rowType == "data" && !e.data.options) {  
            e.rowElement.querySelector(".dx-command-expand").firstChild.classList.remove("dx-datagrid-group-closed");  
            e.rowElement.querySelector(".dx-command-expand").classList.remove("dx-datagrid-expand");  
        }  
    }

    onEditCanceled(e:any) {
        this.options = [];
        this.columns = [];
    }
}