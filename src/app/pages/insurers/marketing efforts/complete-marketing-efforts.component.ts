import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';

import { ManagerService } from '../manager.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-completed-efforts',
    template:
`
<dx-popup
    title="Recently Completed Efforts"
    [(visible)]="show"
    [hideOnOutsideClick]="true"
    (onHiding)="hide.emit()"
    height="auto"
>
    <div *dxTemplate="let data of 'content'">
        <dx-data-grid
            id="completed-efforts"
            [dataSource]="dataSource"
            height='calc(100vh - 200px)'
        >
            <dxo-header-filter [visible]="true"></dxo-header-filter>
            <dxi-column dataField="log_field1" caption="Company" [sortIndex]="1">
                <dxo-lookup
                    [dataSource]="optArray['log_field1']"
                    valueExpr="id"
                    displayExpr="title"
                ></dxo-lookup>
            </dxi-column>
            <dxi-column dataField="log_field4" caption="Manager" [sortIndex]="2">
                <dxo-lookup
                    [dataSource]="optArray['log_field4']"
                    valueExpr="id"
                    displayExpr="name"
                ></dxo-lookup>
            </dxi-column>
            <dxi-column dataField="created_at" caption="Created" dataType="date"></dxi-column>
            <dxi-column dataField="updated_at" caption="Last Updated" [sortIndex]="0" sortOrder="desc" dataType="date"></dxi-column>
            <dxi-column dataField="log_field5" caption="Created By">
                <dxo-lookup
                    [dataSource]="optArray['log_field5']"
                    valueExpr="id"
                    displayExpr="name"
                ></dxo-lookup>
            </dxi-column>
            <dxi-column dataField="source_id" caption="Shop" width="auto">
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
            </dxi-column>
        </dx-data-grid>
    </div>
</dx-popup>`
})
export class CompleteMarketingEffortsComponent implements OnInit {
    @Input() optArray: any[];
    @Input() show: boolean;
    @Output() hide = new EventEmitter<any>();

    dataSource: any;

    dpTemplates = [
        { ds: 'log_field1', label: 'Company', de:'title', ve:'id' },
        { ds: 'log_field4', label: 'Manager', de:'name', ve:'id' },
        { ds: 'log_field5', label: 'Assigned To', de:'name', ve:'id' },
        { ds: 'log_field2', label: 'Status', de:'title', ve:'id' },
        { ds: 'log_field3', label: 'Outcome', de:'title', ve:'id' },
    ];

    constructor (private _ms: ManagerService) {}

    ngOnInit(): void {
        this.dataSource = new CustomStore({
            key: 'id',
            load: () => this.load()
        })
    }

    load(): any {
        let result = this._ms.completedEfforts();

        return firstValueFrom(result)
            .then((resp: any) => {
                console.log(resp.data)
                return resp.data
            })
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }
}