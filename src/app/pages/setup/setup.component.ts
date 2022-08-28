import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { firstValueFrom, lastValueFrom } from 'rxjs';

import { SetupService } from './setup.service';

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
    primary;
    // sorting = false;
    // updatedSortOrder = false;

    sourceClassTabs: any;

    constructor(private _route: ActivatedRoute, private _router: Router, private _setupService: SetupService) { }

    ngOnInit(): void {
        this.initLoad = true;

        this._route.data.subscribe(data => {
            this.data = data;
            console.log(data);
            this.fields = data.response.data.children;
            this.apiRoute = data.apiRoute;

            this.primary = data.response.data.primary;

            if (this.apiRoute === undefined) {
                this.apiRoute = ($.inArray(this.primary.type, ['log', 'notes']) !== -1) ? 'column' : 'option';
            }
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
            .then((data: any) => data.response.data.children)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
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
            .then((resp: any) => (method == 'GET') ? resp.data.children : resp.data)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }
}
