import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';

import { SetupService } from './setup.service';

declare var $ :any;

@Component({
    templateUrl: './setup-segments.component.html'
})
export class CategoryListComponent implements OnInit{
    pageTitle: string = 'Setup Shop Fields';
    errorMessage: string;
    successMessage: string;
    // categories: Array<any>;
    // newCategory: Observable<{}>;

    // route: string;
    data: {};

    constructor(private _route: ActivatedRoute, private _setupService: SetupService){}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.data = data;
        });

        // this._setupService.index({route: this.route, params: 'Shop'})
        //     .subscribe(
        //         response => this.categories = response.data,
        //         error => this.errorMessage = <any>error
        //     );
    }

    // saveCategory(category): void {
    //     this._setupService.save(category, {route: 'category'})
    //     .subscribe(
    //         category => this.onSaveComplete(category),
    //         (error: any) => this.errorMessage = <any>error
    //     )
    // }

    // createCategory(): void {
    //     this.newCategory = this.initNewCategory()
    //         .do(() => $('.ui.modal.new-category').modal('show'));
    // }

    // initNewCategory() {
    //     return of({
    //         id: 0,
    //         title: null,
    //         source_class: 'Shop'
    //     });
    // }

    // initNewField() {
    //     return of({
    //         id: 0,
    //         source_class: 'Shop',
    //         category_id: this.category.id,
    //         title: null,
    //         type: null
    //     });
    // }

    // initNewOption() {
    //     return of({
    //         id: 0,
    //         source_id: this.field.id,
    //         source_class: 'CustomField',
    //         label: null
    //     });
    // }

    // initNewColumn() {
    //     return of({
    //         id: 0,
    //         field_id: this.field.id,
    //         title: null,
    //         type: null
    //     });
    // }

    // initNewOption() {
    //     return of({
    //         id:           0,
    //         source_id:    this.column.id,
    //         source_class: 'CustomFieldLogColumn',
    //         label:        null
    //     });
    // }

    // onSaveComplete(category: any): void {
    //     if (category.method === 'create') {
    //         this.categories.push(category.data);
    //     }
    //     else if (category.method === 'delete') {
    //         this.categories = this.categories.filter(obj => obj.id != category.data.id);
    //     }
        
    //     this.successMessage = category.message;
    // }

}