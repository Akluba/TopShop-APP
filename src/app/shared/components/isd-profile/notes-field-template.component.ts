import { Component, Input, Output, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { LogFieldService } from './log-field.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';

declare let $: any;

@Component({
    selector: 'isd-notes-field-control',
    template:
`
<dx-data-grid
    #dataGrid
    [id]="field.column_name"
    [dataSource]="dataSource"
    [showBorders]="true"
    [columnAutoWidth]="true"
    (onToolbarPreparing)="onToolbarPreparing($event)"
    (onSaving)="onSaving($event)"
    (onEditingStart)="setPopupTitle($event, 'edit')"
    (onInitNewRow)="setPopupTitle($event, 'init')">

    <dxo-header-filter [visible]=true></dxo-header-filter>
    <dxo-scrolling columnRenderingMode="virtual"></dxo-scrolling>
    <dxo-paging [pageSize]="10"></dxo-paging>
    
    <dxo-editing
      mode="popup"
      [allowUpdating]="true"
      [allowAdding]="true">
      <dxo-popup
        [title]="popupTitle"
        [showTitle]="true"
        [width]="700"
        [height]="525">
      </dxo-popup>
    </dxo-editing>

    <!-- Command Column with Delete Button -->
    <dxi-column type="buttons">
        <dxi-button name="edit"></dxi-button> 
    </dxi-column>

    <!-- Dynamic Columns -->
    <dxi-column *ngFor="let column of columnsWithLookup | sortOrder"
        [dataField]="column.column_name"
        [caption]="column.title"
        [lookup]="column.lookup || null"
        [allowEditing]="true"
        [cellTemplate]="column.type === 'checkbox' ? 'viewTemplate' : null"
        editCellTemplate="fieldTemplate"
        [visible]="column.system"
        [dataType]="column.type === 'date' ? 'date' : null">
            
    </dxi-column>

    <!-- View mode template -->
    <div *dxTemplate="let cell of 'viewTemplate'">
        <span>{{ cell.value == 1 ? 'True' : 'False' }}</span>
    </div>

    <!-- Define checkbox template -->
    <div *dxTemplate="let cell of 'fieldTemplate'">
       <isd-data-field-control 
        [field]="getColumnInfo(cell.column.dataField)" 
        [(value)]="cell.data[cell.column.dataField]"
        (valueChanged)="cellUpdated($event, cell)">
      </isd-data-field-control>
    </div>
</dx-data-grid>
`
})
export class ISDNotesFieldComponent implements OnInit {
    constructor(private _route: ActivatedRoute, private _lfService: LogFieldService) {}

    @Input() field: any;
    @Input() value: any;
    @ViewChild('dataGrid', { static: false }) dataGrid!: DxDataGridComponent;

    pendingChangesPromise: Promise<any> | null = null;
    saveResolver!: { resolve: () => void; reject: (reason?: any) => void };
    columnsWithLookup: any[] = [];
    source_id: number;
    dataSource: CustomStore;
    popupTitle: string = "";

    ngOnInit() {

        this.dataSource = new CustomStore({
            key: 'id',
            load: () => Promise.resolve(this.value),
            update: (key, value) => Promise.resolve(value),
            insert: (values) => Promise.resolve(values)
        })

        this._route.params.subscribe(params => {
            const source_id = this.field.source_class === 'Shop' ? 'shop_id' : 'manager_id';
            this.source_id = parseInt(params[source_id], 10);
        });

        this.columnsWithLookup = this.field.columns.map(column => {
            
            if (column.type === 'select' && column.options) {
                // Fix for id values being strings - need to cast as Int 
                if (this.value) {
                    this.value.map(function(row) {
                        if (typeof row[column.column_name] === 'string') { row[column.column_name] = parseInt(row[column.column_name], 10); }
                        return { ...row };
                    }, column);
                }

                return {
                    ...column,
                    lookup: {
                        dataSource: {
                            store: {
                            type: 'array',
                            key: 'id', // Define the key field for the dataSource
                            data: column.options, // The array of lookup options
                            },
                        },
                        displayExpr: column.mapped ? 'name' : 'title',
                        valueExpr: 'id',
                    }
                };
            }

            return column; // Non-select columns are returned as-is
        });

    }

    onToolbarPreparing(e: any): void {
        e.toolbarOptions.items = e.toolbarOptions.items.filter(
            (item: any) => item.name !== 'saveButton'
        );

        e.toolbarOptions.items.unshift({
            location: 'before',
            template: () => {
              const label = document.createElement('span');
              label.textContent = this.field.title;
              label.style.fontWeight = 'bold';
              return label;
            },
        });
    }

    setPopupTitle(e, action) {
        this.popupTitle = action === 'init' ? 'Log New Activity' : `Update: ${e.data.log_field3}`
    }

    getColumnInfo(dataField: string): any {
        return this.columnsWithLookup.find(col => col.column_name === dataField);
    }

    cellUpdated(e:any, cell): void {
        cell.setValue(e[cell.column.dataField]);
    }

    onOptionChanged(e: any): void {
        if (e.fullName === 'editing.changes') {
            this._lfService.updateHasChangesState();
        }
    }

    onSaving(e: any): void {
        if (e.changes.length === 0) {
            // No changes, resolve the promise immediately
            e.promise = new Promise<void>((resolve) => resolve());
            return;
        } 

        const columnName = this.field.column_name;
        let body = { id: this.source_id, [columnName]: [] };

        e.changes.forEach(change => {
            if (change.type === 'insert') {
                const addedData = {...new LogEntry(0, this.field.id, this.field.source_class, this.source_id), ...change.data}
                body[columnName].push(addedData);
            } else if (change.type === 'update') {
                const fullRow = this.value.find(row => row.id === change.key);
                const updatedData = { ...fullRow, ...change.data };
                body[columnName].push(updatedData);
            }
        });

        e.promise = this._lfService.singleSave(body)
            .then((response) => {
                if (!response) { 
                    throw new Error('No response received from server');
                  }
            
                  if (response.error) {
                    throw new Error(response.message);
                  }

                  this.value = response[columnName];

                  return;
            })
            .catch((error) => {
                console.error("🚨 Error saving:", error);
                throw error;
            })
    }
}

class LogEntry {
    id: number | null;
    field_id: number;
    source_class: string;
    source_id: number;

    constructor(id: number | null, field_id: number, source_class: string, source_id: number) {
        this.id = id;
        this.field_id = field_id;
        this.source_class = source_class;
        this.source_id = source_id;
      }
}