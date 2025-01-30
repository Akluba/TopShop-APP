import { Component, Input, Output, OnInit, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { LogFieldService } from './log-field.service';
import DataSource from 'devextreme/data/data_source';

declare let $: any;

@Component({
    selector: 'isd-log-field-control',
    template:
`
<dx-data-grid
    #dataGrid
    [id]="field.column_name"
    [dataSource]="dataSource"
    [showBorders]="true"
    [columnAutoWidth]="true"
    [repaintChangesOnly]="true"
    (onToolbarPreparing)="onToolbarPreparing($event)"
    (onSaving)="onSaving($event)"
    (onOptionChanged)="onOptionChanged($event)">

    <dxo-header-filter [visible]=true></dxo-header-filter>
    <dxo-scrolling columnRenderingMode="virtual"></dxo-scrolling>
    <dxo-paging [pageSize]="10"></dxo-paging>
    
    <dxo-editing
      mode="batch"
      [allowUpdating]="true"
      [allowAdding]="true"
      [allowDeleting]="true">
    </dxo-editing>

    <!-- Command Column with Delete Button -->
    <dxi-column type="buttons">
        <dxi-button
        name="delete">
        </dxi-button> 
    </dxi-column>

    <dxi-column
        dataField="created_at"
        caption="Created"
        dataType="date"
        [allowEditing]="false">
    </dxi-column>

    <dxi-column
        dataField="updated_at"
        caption="Last Updated"
        dataType="date"
        [allowEditing]="false"
        [sortIndex]="0"
        sortOrder="desc">
    </dxi-column>

    <!-- Dynamic Columns -->
    <dxi-column *ngFor="let column of columnsWithLookup | sortOrder"
        [dataField]="column.column_name"
        [caption]="column.title"
        [lookup]="column.lookup || null"
        [allowEditing]="true"
        [cellTemplate]="column.type === 'checkbox' ? 'viewTemplate' : null"
        editCellTemplate="fieldTemplate">
    </dxi-column>

    <!-- View mode template -->
    <div *dxTemplate="let cell of 'viewTemplate'">
        <span>{{ cell.value ? 'True' : 'False' }}</span>
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
export class ISDLogFieldComponent implements OnInit, OnDestroy {
    constructor(private _route: ActivatedRoute, private _lfService: LogFieldService) {}

    @Input() field: any;
    @Input() value: any;
    @Output() datagridSaved = new EventEmitter<any>();
    @ViewChild('dataGrid', { static: false }) dataGrid!: DxDataGridComponent;

    pendingChangesPromise: Promise<any> | null = null;
    saveResolver!: { resolve: () => void; reject: (reason?: any) => void };
    columnsWithLookup: any[] = [];
    source_id: number;
    dataSource: DataSource;

    ngOnInit() {
        this._lfService.register(this);

        this.dataSource = new DataSource({
            key: 'id',
            load: () => { return Promise.resolve(this.value) }
        })

        this._route.params.subscribe(params => {
            const source_id = this.field.source_class === 'Shop' ? 'shop_id' : 'manager_id';
            this.source_id = parseInt(params[source_id], 10);
        });

        this.columnsWithLookup = this.field.columns.map(column => {
            
            if ((column.type === 'select' || column.type === 'select_multiple')&& column.options) {
                // Fix for id values being strings - need to cast as Int 
                if (this.value) {
                    this.value.map(function(row) {
                        if (typeof row[column.column_name] === 'string') { row[column.column_name] = parseInt(row[column.column_name], 10); }
                        return { ...row };
                    }, column);
                }

                console.log(this.value);

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

    ngOnDestroy(): void {
        this._lfService.unregister(this);
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
        e.cancel = true;

        this.pendingChangesPromise = this.processChangesAsync(e.changes);

        e.promise = new Promise<void>((resolve, reject) => {
            this.saveResolver = { resolve, reject };
        })
        .then(() => {
            return e.component.refresh(true).then(() => {
                e.component.cancelEditData(); // Clear the edit state
            })
        })
        .catch((error) => {
            console.error(`${new Date().toISOString()} - Error during post-save tasks`, error);
        });
    }

    processChangesAsync(changes: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const columnName = this.field.column_name;
                let dirtyRows = { [columnName]: [] };

                changes.forEach(change => {
                    if (change.type === 'insert') {
                        const addedData = {...new LogEntry(0, this.field.id, this.field.source_class, this.source_id), ...change.data}
                        dirtyRows[columnName].push(addedData);
                    } else if (change.type === 'update') {
                        const fullRow = this.value.find(row => row.id === change.key);
                        const updatedData = { ...fullRow, ...change.data };
                        dirtyRows[columnName].push(updatedData);
                    } else if (change.type === 'remove') {
                        const removedData = this.value.find(row => row.id === change.key);
                        removedData.deleted = true;
                        dirtyRows[columnName].push(removedData);
                    }
                });

                this.datagridSaved.emit(dirtyRows);
                resolve(dirtyRows);
            } catch (error) {
                reject(error); // Reject the promise on failure
            }
        });
    } 

    finalizeSave(success: boolean): void {
        if (success) {
            this.saveResolver.resolve(); // Resolve the e.promise
        } else {
            this.saveResolver.reject('Save failed'); // Reject the e.promise
        }

        this.saveResolver = null; // Clear the resolver
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