import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import { firstValueFrom, lastValueFrom, Subscription } from 'rxjs';

import { ManagerService } from './manager.service';

@Component({
    template:
`
<h2 class="content-block">Manager List</h2>
<app-data-list
    [fields] = 'fields'
    [defaultCols] = 'defaultColumns'
    [newObjFields] = 'newObjFields'
    [data]='dataSource'
    (navigateTo)="navigate($event)">
</app-data-list>
`
})
export class ManagerListComponent implements OnInit, OnDestroy {
    initLoad: boolean;
    fields: any;
    dataSource: any;
    readonly defaultColumns = [];
    readonly newObjFields = ['name'];
    readonly objFields = {name: {title: 'Manager Name', column: 'name'}};
    private sub: Subscription;

    constructor (private _route: ActivatedRoute, private _router: Router, private _managerService: ManagerService) {
        this.dataSource = new CustomStore({
            key: 'id',
            load: () => this.load(),
            insert: (values) => this.sendRequest('POST', {values}),
            remove: (key) => this.sendRequest('DELETE',{key})
        })
    }

    ngOnInit(): void {
        this.initLoad = true;
        this.sub = this._route.data.subscribe(data => {
            this.fields = {};

            for (const field of Object.keys(this.objFields)) {
                this.fields[field] = {
                    title: this.objFields[field]['title'],
                    column_name: this.objFields[field]['column'],
                }
            }

            this.fields = { ...this.fields, ...data.response.data.fields }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    load(): any {
        if (!this.initLoad) return this.sendRequest();

        this.initLoad = false;

        return firstValueFrom(this._route.data)
            .then((data: any) => data.response.data.manager_list)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    sendRequest(method = 'GET', data: any = {}): any {
        let result;

        switch(method) {
            case 'GET':
                result = this._managerService.index();
                break;
            case 'POST':
                result = this._managerService.save({ id: 0 , ...data.values });
                break;
            case 'DELETE':
                result = this._managerService.destroy(data.key);
                break;
        }

        return lastValueFrom(result)
            .then((resp: any) => (method==='GET' ? resp.data.shop_list : resp.data))
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    navigate(id): void {
        this._router.navigate([ id ], { relativeTo: this._route });
    }
}
