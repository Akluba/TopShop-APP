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
    sectionTitle: string;
    errorMessage: string;
    successMessage: string;
    category: any;
    fields: Array<any>;
    newField: Observable<{}>;
    
    constructor(private _route: ActivatedRoute, private _setupService: SetupService){}

    ngOnInit(): void {
        let data = this._route.snapshot.data['category'].data;

        this.category = data;
        this.fields = data.fields;

        this.sectionTitle = `Category: ${this.category.title} -> Fields`;
    }

    deleteField(field): void {
        if(confirm(`Are you sure you want to delete the field: ${field.title}?`)) {
            this._setupService.destroy(field.id, {route: 'field'})
                .subscribe(
                    field => this.onSaveComplete(field),
                    (error: any) => this.errorMessage = <any>error
                );
        }
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