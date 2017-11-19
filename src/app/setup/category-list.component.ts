import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { SetupService } from './setup.service';
import { ICategory } from './category';

declare var $ :any;

@Component({
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit{
    pageTitle: string = 'Setup Shop Fields';
    errorMessage: string;
    successMessage: string;
    categories: Array<any>;
    newCategory: Observable<{}>;

    route: string;

    constructor(private _route: ActivatedRoute, private _setupService: SetupService){}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.route = data['route'];
        });

        this._setupService.index({route: this.route, params: 'Shop'})
            .subscribe(
                response => this.categories = response.data,
                error => this.errorMessage = <any>error
            );
    }

    saveCategory(category): void {
        this._setupService.save(category, {route: 'category'})
        .subscribe(
            category => this.onSaveComplete(category),
            (error: any) => this.errorMessage = <any>error
        )
    }

    createCategory(): void {
        this.newCategory = this.initNewCategory()
            .do(() => $('.ui.modal.new-category').modal('show'));
    }

    initNewCategory() {
        return of({
            id: 0,
            title: null,
            source_class: 'Shop'
        });
    }

    onSaveComplete(category: any): void {
        if (category.method === 'create') {
            this.categories.push(category.data);
        }
        else if (category.method === 'delete') {
            this.categories = this.categories.filter(obj => obj.id != category.data.id);
        }
        
        this.successMessage = category.message;
    }

}