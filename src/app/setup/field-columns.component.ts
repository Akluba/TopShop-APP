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
    sectionTitle: string;
    errorMessage: string;
    successMessage: string;
    category: any;
    field: any;
    columns: Array<any>;
    newColumn: Observable<{}>;

    constructor(private _route: ActivatedRoute, private _setupService: SetupService) {}
    
    ngOnInit(): void {
        this._route.parent.data.subscribe(data => {
            this.field = data['field'].data;

            this.category = this.field.category;
            this.columns = this.field.columns;
        });

        this.sectionTitle = `Category: ${this.category.title} -> Field: ${this.field.title} -> Columns`;
    }

    deleteColumn(column): void {
        if(confirm(`Are you sure you want to delete the column: ${column.title}?`)) {
            this._setupService.destroy(column.id, {route: 'column'})
                .subscribe(
                    column => this.onSaveComplete(column),
                    (error: any) => this.errorMessage = <any>error
                );
        }
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