import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { SetupService } from './setup.service';

declare var $ :any;

@Component({
    templateUrl: 'field-columns.component.html'
})
export class FieldColumnsComponent {
    errorMessage: string;
    successMessage: string;
    category: any;
    field: any;
    columns: Array<any>;
    newColumn: Observable<{}>;

    route: string;

    constructor(private _route: ActivatedRoute, private _setupService: SetupService) {}
    
    ngOnInit(): void {
        this._route.parent.data.subscribe(data => {
            this.field = data['field'].data;

            this.category = this.field.category;
            this.columns = this.field.columns;
        });

        this._route.data.subscribe(data => {
            this.route = data['route'];
        });
    }

    saveColumn(column): void {
        this._setupService.save(column, {route: 'column'})
        .subscribe(
            option => this.onSaveComplete(option),
            (error: any) => this.errorMessage = <any>error
        )
    }

    createColumn():void {
        this.newColumn = this.initNewColumn()
            .do(() => $('.ui.modal.new-column').modal('show'));
    }

    initNewColumn() {
        return of({
            id: 0,
            field_id: this.field.id,
            title: null,
            type: null
        });
    }

    onSaveComplete(column: any): void {
        if (column.method === 'create') {
            this.columns.push(column.data);
        }
        else if (column.method === 'delete') {
            this.columns = this.columns.filter(obj => obj.id != column.data.id);
        }
        
        this.successMessage = column.message;
    }
}