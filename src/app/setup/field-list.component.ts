import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { SetupService } from './setup.service';

declare var $ :any;

@Component({
    templateUrl: './field-list.component.html'
})
export class FieldListComponent implements OnInit{
    pageTitle: string = 'Setup Shop Fields';
    errorMessage: string;
    successMessage: string;
    category: any;
    fields: Array<any>;
    newField: Observable<{}>;

    route: string;
    
    constructor(private _route: ActivatedRoute, private _setupService: SetupService){}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.route = data['route'];

            this.category = data['category'].data;
            this.fields = this.category.fields
        });
    }

    saveField(field): void {
        this._setupService.save(field, {route: 'field'})
        .subscribe(
            field => this.onSaveComplete(field),
            (error: any) => this.errorMessage = <any>error
        )
    }

    createField():void {
        this.newField = this.initNewField()
            .do(() => $('.ui.modal.new-field').modal('show'));
    }

    initNewField() {
        return of({
            id: 0,
            source_class: 'Shop',
            category_id: this.category.id,
            title: null,
            type: null
        });
    }

    onSaveComplete(field: any): void {
        if (field.method === 'create') {
            this.fields.push(field.data);
        }
        else if (field.method === 'delete') {
            this.fields = this.fields.filter(obj => obj.id != field.data.id);
        }
        
        this.successMessage = field.message;
    }

}