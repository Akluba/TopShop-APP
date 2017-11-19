import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { SetupService } from './setup.service';

declare var $ :any;

@Component({
    templateUrl: 'column-options.component.html'
})
export class ColumnOptionsComponent implements OnInit{
    pageTitle: string = 'Setup Shop Fields';
    errorMessage: string;
    successMessage: string;
    category: any;
    field: any;
    column: any;
    options: Array<any>;
    newOption: Observable<{}>;

    route: string;

    constructor(private _route: ActivatedRoute, private _setupService: SetupService) {}
    
    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.column = data['column'].data;

            this.route = data['route'];

            this.category = this.column.field.category;
            this.field = this.column.field;
            this.options = this.column.options;
        });
    }

    save(obj): void {
        this._setupService.save(obj, {route: this.route})
        .subscribe(
            res => this.onSaveComplete(res),
            (error: any) => this.errorMessage = <any>error
        )
    }

    create():void {
        this.newOption = this.initNewOption()
            .do(() => $('.ui.modal.new-option').modal('show'));
    }

    initNewOption() {
        return of({
            id:           0,
            source_id:    this.column.id,
            source_class: 'CustomFieldLogColumn',
            label:        null
        });
    }

    onSaveComplete(res: any): void {
        if (res.method === 'create') {
            this.options.push(res.data);
        }
        else if (res.method === 'delete') {
            this.options = this.options.filter(obj => obj.id != res.data.id);
        }
        
        this.successMessage = res.message;
    }

}