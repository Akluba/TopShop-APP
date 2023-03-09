import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Subscription } from 'rxjs';
import CustomStore from 'devextreme/data/custom_store';

import { ManagerService } from '../manager.service';

@Component({
    template:
`
<h2 class="content-block">Open Marketing Efforts</h2>
<dx-tree-list
    height='calc(100vh - 200px)'
    id="efforts"
    [dataSource]="dataSource"
    keyExpr="id"
    itemsExpr="items"
    dataStructure="tree"
    [showRowLines]="true"
    [showBorders]="true"
    [columnAutoWidth]="true"
    (onEditorPreparing)="editorPreparing($event)"
    (onSaving)="onSaving($event)">
    <dxo-header-filter [visible]="true"></dxo-header-filter>
    <dxo-toolbar>
        <dxi-item location="before" text="{{count}} Open Records"></dxi-item>
        <dxi-item name="saveButton"></dxi-item>
        <dxi-item name="revertButton"></dxi-item>
    </dxo-toolbar>
    <dxo-editing
        mode="batch"
        [allowUpdating]="true">
    </dxo-editing>
    <dxi-column dataField="company" [allowEditing]="false" caption="Company" [calculateSortValue]="calculateSortValue" sortOrder="asc">
        <dxo-lookup
            [dataSource]="optArray['log_field1']"
            valueExpr="id"
            displayExpr="title"
        ></dxo-lookup>
    </dxi-column>
    <dxi-column dataField="manager" [allowEditing]="false" caption="Manager">
        <dxo-lookup
            [dataSource]="optArray['log_field4']"
            valueExpr="id"
            displayExpr="name"
        ></dxo-lookup>
    </dxi-column>
    <dxi-column dataField="created_at" [allowEditing]="false" caption="Created" dataType="date"></dxi-column>
    <dxi-column dataField="updated_at" [allowEditing]="false" caption="Last Updated" dataType="date"></dxi-column>
    <dxi-column dataField="log_field5" [allowEditing]="false" caption="Created By">
        <dxo-lookup
            [dataSource]="optArray['log_field5']"
            valueExpr="id"
            displayExpr="name"
        ></dxo-lookup>
    </dxi-column>
    <dxi-column dataField="source_id" [allowEditing]="false" caption="Shop">
        <dxo-lookup
            [dataSource]="optArray['source_id']"
            valueExpr="id"
            displayExpr="name"
        ></dxo-lookup>
    </dxi-column>
    <dxi-column dataField="log_field2" dataType="number" caption="Status">
        <dxo-lookup
            [dataSource]="optArray['log_field2']"
            valueExpr="id"
            displayExpr="title"
        ></dxo-lookup>
    </dxi-column>
    <dxi-column dataField="log_field3" dataType="number" caption="Outcome">
        <dxo-lookup
            [dataSource]="optArray['log_field3']"
            valueExpr="id"
            displayExpr="title"
        ></dxo-lookup>
        <dxi-validation-rule
            type="custom"
            [validationCallback]="validateOutcome"
            message="An Outcome is required when Status is Complete "
        ></dxi-validation-rule>
    </dxi-column>
</dx-tree-list>
`
})
export class MarketingEffortsComponent implements OnInit, OnDestroy {
    initLoad: boolean;
    count: number;
    dataSource: any;
    optArray: any[] = [];

    private sub: Subscription;

    constructor (private _route: ActivatedRoute, private _router: Router, private _managerService: ManagerService) {
        this.dataSource = new CustomStore({
            key: 'id',
            load: () => this.load(),
            update: (values) => this.sendRequest('PUT', {values})
            // insert: (values) => this.sendRequest('POST', {values}),
            // remove: (key) => this.sendRequest('DELETE',{key})
        })
    }

    ngOnInit(): void {
        this.initLoad = true;
        this.sub = this._route.data.subscribe(data => {
            this.count = data.response.data.meta.effort_count;
            // creating lookups for field options
            data.response.data.field.columns.forEach(col => {
                this.optArray[col.column_name] = {
                    store: col.options,
                    sort: (col.column_name === 'source_id') ? 'name' : 'sort_order',
                  };
            });

            this.optArray['log_field4']['store'].push({id:0, name:'No Manager Assigned'});
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    load(): any {
        if (!this.initLoad) return this.sendRequest();

        this.initLoad = false;

        return firstValueFrom(this._route.data)
            .then((data: any) => data.response.data.efforts)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    calculateSortValue(data) {
        const column = this as any;
        const value = column.calculateCellValue(data);
        return column.lookup.calculateCellValue(value);
    }

    editorPreparing(e) {
        // Disable editor for Company and Manger rows
        if (e.row.data.hasOwnProperty('company') || e.row.data.hasOwnProperty('manager')) {
            e.editorOptions.disabled = true;
        }
        // Disable Outcome column unless status is Complete
        if (e.dataField === 'log_field3' && e.row.data.log_field2 != 379) {
            e.editorOptions.disabled = true;
        }
    }

    validateOutcome(e) {
        return e.data.log_field2 != 379 || (e.data.log_field2 == 379 && !!e.value);
    }

    async onSaving(e: any) {
        e.cancel = true;

        if (e.changes.length) {
            let updates = [];

            e.changes.forEach((c) => {
                updates.push({...{id:c.key}, ...c.data})
            })

            await this.dataSource.update(updates)

            await e.component.refresh(true);
            e.component.cancelEditData();
        }
    }

    sendRequest(method = 'GET', data: any = {}): any {
        let result;

        switch(method) {
            case 'GET':
                result = this._managerService.effortsIndex();
                break;
            case 'PUT':
                result = this._managerService.updateEfforts(data);
                break;
            // case 'POST':
            //     result = this._managerService.save({ id: 0 , ...data.values });
            //     break;
            // case 'DELETE':
            //     result = this._managerService.destroy(data.key);
            //     break;
        }

        return lastValueFrom(result)
            .then((resp: any) => {
                if (method==='GET') {
                    this.count = resp.data.meta.effort_count;
                    return resp.data.efforts;
                } else return resp.data;
            })
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }
}