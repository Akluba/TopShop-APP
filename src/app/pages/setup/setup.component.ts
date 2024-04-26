import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';

import { SetupService } from './setup.service';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

declare var $: any;

@Component({
    templateUrl: './setup.component.html'
})
export class SetupComponent implements OnInit {
    initLoad: boolean;
    sourceClass: string;
    dataSource: any;
    data: any;
    fields: any;
    apiRoute: string;
    // primary;
    // sorting = false;
    // updatedSortOrder = false;

    categoryOptions: {};
    popupVisible: boolean = false;
    createModel: {};
    addCategoryButtonOptions = {
        styleMode: "text",
        text: 'Add Category',
        onClick: () => {
            this.createModel = new Category(this.sourceClass);
            this.togglePopup();
        }
    }

    addFieldButtonOptions = {
        styleMode: "contained",
        type: "default",
        text: 'Add Field',
        onClick: () => {
            this.createModel = new Field(this.sourceClass);
            this.togglePopup();
        }
    }

    sourceClassTabs: any;

    constructor(private _route: ActivatedRoute, private _router: Router, private _setupService: SetupService) { 
    }

    ngOnInit(): void {
        this.initLoad = true;

        this._route.data.subscribe(data => {
            this.data = data;
            this.fields = data.response.data;
            this.apiRoute = data.apiRoute;

            this.categoryOptions = {
                dataSource: new DataSource({
                    store: new ArrayStore({
                        key: "id",
                        data: this.fields
                    })
                }),
                valueExpr: 'id',
                displayExpr: 'title'
            };
        });

        this._route.params.subscribe(params => {
            this.sourceClass = params.source_class;
            this.initLoad = true;

            this.sourceClassTabs = {
                height: '30px',
                label: 'Manage Fields:',
                items: ['shop','manager','vendor'],
                selectedItem: this.sourceClass,
                onItemClick: (e) => { this._router.navigate(['/setup/', e.itemData]) }
            };

            this.dataSource = new CustomStore({
                key: 'id',
                load: () => this.load(),
                update: (key, values) => this.sendRequest('PUT', values),
                insert: (values) => this.sendRequest('POST', {values}),
                remove: (key) => this.sendRequest('DELETE',{key})
            })
        });
    }

    load(): any {
        if (!this.initLoad) return this.sendRequest();

        this.initLoad = false;

        return firstValueFrom(this._route.data)
        .then((data: any) => data.response.data)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    togglePopup() {
        this.popupVisible = !this.popupVisible;
    }

    onReorder(e) {
        e.promise = this.processReorder(e);
    }

    async processReorder(e) {
        const visibleRows = e.component.getVisibleRows();
        const newOrderIndex = visibleRows[e.toIndex].data.sort_order;

        await this.dataSource.update(e.itemData.id, {reorder:true, id:e.itemData.id, sort_order:newOrderIndex });
        await e.component.refresh();
    }

    sendRequest(method = 'GET', data: any = {}): any {
        let result;

        switch(method) {
            case 'GET':
                result = this._setupService.index(this.sourceClass, this.apiRoute);
                break;
            case 'POST':
            case 'PUT':
                result = this._setupService.save(data, this.apiRoute);
                break;
            case 'DELETE':
                result = this._setupService.destroy(data.key, this.apiRoute);
                break;
        }

        return lastValueFrom(result)
            .then((resp: any) => (method == 'GET') ? resp.data : resp.data)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }
}

class Category {
    source_class: string;
    title: string = '';
    sort_order: number = 0;
    
    constructor(source_class) {
        this.source_class   = source_class;
    }
} 

class Field {
    source_class: string;
    title: string = '';
    sort_order: number = 0;
    category_id: number = null;
    type: string = null;
    
    constructor(source_class) {
        this.source_class   = source_class;
    }
} 