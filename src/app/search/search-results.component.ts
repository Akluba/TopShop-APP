import { Component, Input, OnInit } from '@angular/core';

import { Column } from '../shared/ListDataTable/Classes';

@Component({
    selector: 'app-search-results',
    template:
`
<div class="ui secondary segment">
    <p-table #dt
        [columns]='selectedColumns'
        [value]="matches"
        [sortField]="'name'"
        [(selection)]="selectedData"
        [scrollable]="true"
        [style]="{width:'100%'}">

        <ng-template pTemplate="colgroup" let-columns>
            <colgroup>
                <col style="width:2.25em">
                <col *ngFor="let col of columns" style="width:250px">
            </colgroup>
        </ng-template>

        <ng-template pTemplate="header" let-columns>
            <tr> <!-- Sortable Columns -->
                <th style="width: 2.25em">
                    <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
                </th>
                <th *ngFor="let col of columns" [pSortableColumn]="col.field">
                    {{ col.header }}
                    <p-sortIcon [field]="col.field"></p-sortIcon>
                </th>
            </tr>
            <tr> <!-- Field Filters -->
                <th></th>
                <th *ngFor="let col of columns" [ngSwitch]='col.type'>
                    <div class="ui mini fluid input" *ngSwitchCase="'text'">
                        <input type="text" (input)="dt.filter($event.target.value, col.field, col.filterMatchMode)"/>
                    </div>
                    <p-multiSelect *ngSwitchCase="'select'" [options]="col.options" appendTo="body" defaultLabel="All Options" [style]="{'width':'100%'}" (onChange)="dt.filter($event.value, col.field, 'in')"></p-multiSelect>
                    <p-multiSelect *ngSwitchCase="'select_multiple'" [options]="col.options" appendTo="body" defaultLabel="All Options" [style]="{'width':'100%'}" (onChange)="dt.filter($event.value, col.field, 'multi')"></p-multiSelect>
                    <p-multiSelect *ngSwitchCase="'checkbox'" [options]="boolOptions" appendTo="body" defaultLabel="All Options" [style]="{'width':'100%'}" (onChange)="dt.filter($event.value, col.field, 'in')"></p-multiSelect>
                </th>
            </tr>
        </ng-template>

        <ng-template pTemplate="body" let-data let-columns="columns">
            <tr [pSelectableRow]="data"> <!-- Selectable Row -->
                <td><p-tableCheckbox [value]="data"></p-tableCheckbox></td>
                <td *ngFor="let col of columns">
                    <ng-container *ngIf="col.field === 'name'; then nameLink; else rawData"></ng-container>
                    <ng-template #nameLink>
                        <a [routerLink]="['/', sourceClass, data.id]">{{ data.name }}</a>
                    </ng-template>
                    <ng-template #rawData>{{ data[col.field] }}</ng-template>
                </td>
            </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage" let-columns>
            <tr>
                <td attr.colspan="{{ columns.length + 2 }}">No Matches Found</td>
            </tr>
        </ng-template>

    </p-table>
</div>
`
})
export class SearchResultsComponent implements OnInit {
    @Input() searchResponse: {matches: any[], fields: any[]};
    @Input() sourceClass: string;
    matches: any[];
    fields: any[];
    tableColumns = [];
    selectedColumns = [];
    boolOptions: any[];
    selectedData: any[];

    ngOnInit(): void {
        this.sourceClass = (this.sourceClass === 'cpr') ? this.sourceClass : this.sourceClass + 's';
        this.matches = this.searchResponse.matches;
        this.fields = this.searchResponse.fields;
        this.setTableColumns();

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
}
