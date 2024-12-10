import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, Subscription } from 'rxjs';

import CustomStore from 'devextreme/data/custom_store';
import validationEngine from 'devextreme/ui/validation_engine';

import { ManagerService } from '../manager.service';
import { AuthService, IUser } from 'src/app/shared/services';
import { DxTreeListComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';

@Component({
    templateUrl: 'marketing-efforts.component.html',
    styles: ['::ng-deep .dx-dropdowneditor-input-wrapper.dx-selectbox-container {width: 100%;}']
})
export class MarketingEffortsComponent implements OnInit, OnDestroy {
    @ViewChild('treeList', { static: false }) treeList: DxTreeListComponent;
    initLoad: boolean;
    count: number;
    dataSource: any;
    optArray: any[] = [];
    shopOptions: any;

    formData: {};
    visible = false;
    showCompleted = false;

    out_val = false;
    out_dis = true;

    user: IUser;

    dpTemplates = [
        { ds: 'log_field1', label: 'Company', de:'title', ve:'id' },
        { ds: 'log_field4', label: 'Manager', de:'name', ve:'id' },
        { ds: 'log_field5', label: 'Assigned To', de:'name', ve:'id' },
        { ds: 'log_field2', label: 'Status', de:'title', ve:'id' },
        { ds: 'log_field3', label: 'Outcome', de:'title', ve:'id' },
    ];

    private sub: Subscription;

    constructor (private _route: ActivatedRoute, private _as: AuthService, private _managerService: ManagerService) {
        this.dataSource = new CustomStore({
            key: 'id',
            load: () => this.load(),
            update: (values) => this.sendRequest('PUT', {values}),
            insert: (values) => this.sendRequest('POST', {values}),
            // remove: (key) => this.sendRequest('DELETE',{key})
        });
    }

    async ngOnInit() {
        this.initLoad = true;

        this.sub = this._route.data.subscribe(data => {
            this.count = data.response.data.meta.effort_count;

            // creating lookups for field options
            data.response.data.field.columns.forEach(col => {
                let selector = (col.column_name === 'source_id' || col.column_name === 'log_field4') ? 'name' : 'sort_order';
                
                this.optArray[col.column_name] = {
                    store: col.options,
                    sort: selector,
                };

                if (col.column_name === 'source_id') {
                    this.shopOptions = new DataSource({
                        store: new ArrayStore({
                            data: col.options,
                            key: 'id'
                        }),
                        sort: selector
                    });
                }

            });

            this.optArray['log_field4']['store'].push({id:0, name:'No Manager Assigned'});
        });

        await this._as.getUser().then((e) => this.user = e.data);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    editorPreparing(e) {
        // Disable editor for Company and Manger rows
        if (e.row.data.hasOwnProperty('company') || e.row.data.hasOwnProperty('manager')) {
            e.editorOptions.disabled = true;
        }
        // Disable Outcome column unless status is Complete
        if (e.dataField === 'log_field3' && e.row.data.log_field2 != 379) {
            e.editorOptions.disabled = true;
        }
    }

    calculateSortValue(data) {
        if (!('company' in data) && !('source_id' in data)) return;

        const column = this as any;
        const value = column.calculateCellValue(data);

        console.log(value);
        return column.lookup.calculateCellValue(value);
    }

    showPopup = () => {
        this.formData = new Effort(this.user.id);
        this.visible = true;
    };

    onOpen(e) {
        e.component.close();
      }

    onEditorPreparing(e) {
        if (e.parentType === "searchPanel") {
          e.editorOptions.width = 400;
        }
      }
      onToolbarPreparing(e) {
        let toolbarItems = e.toolbarOptions.items;
        // Modifies an existing item
        toolbarItems.forEach(function (item) {
          if (item.name === "searchPanel") {
            item.location = "center";
          }
        });
      }

    hidePopup = () => {
        this.visible = false;
    };

    dropdownChange = (f,e) => {
        if (f != 'log_field2') return;

        this.out_val = e.value == 379;
        this.out_dis = e.value != 379;

        if (this.out_dis) this.formData['log_field3'] = null;
    }

    validateOutcome(e) {
        return e.data.log_field2 != 379 || (e.data.log_field2 == 379 && !!e.value);
    }

    load(): any {
        if (!this.initLoad) return this.sendRequest();

        this.initLoad = false;

        return firstValueFrom(this._route.data)
            .then((data: any) => data.response.data.efforts)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    createEfforts = async () => {
        const result = validationEngine.validateGroup('gridForm');

        if (!result.isValid) return;

        await this.dataSource.insert(this.formData);

        await this.treeList.instance.refresh(true);
        this.hidePopup();
    };

    async onSaving(e: any) {
        e.cancel = true;

        if (e.changes.length) {
            let updates = [];

            e.changes.forEach((c) => {
                updates.push({...{id:c.key}, ...c.data})
            })

            await this.dataSource.update(updates)

            await e.component.refresh(true);
            e.component.cancelEditData();
        }
    }

    sendRequest(method = 'GET', data: any = {}): any {
        let result;

        switch(method) {
            case 'GET':
                result = this._managerService.effortsIndex();
                break;
            case 'PUT':
                result = this._managerService.saveEfforts({id:0, ...data});
                break;
            case 'POST':
                result = this._managerService.saveEfforts(data);
                break;
            // case 'DELETE':
            //     result = this._managerService.destroy(data.key);
            //     break;
        }

        return lastValueFrom(result)
            .then((resp: any) => {
                if (method==='GET') {
                    this.count = resp.data.meta.effort_count;
                    return resp.data.efforts;
                } else return resp.data;
            })
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }
}

class Effort {
    log_field1: null;
    log_field2: number;
    log_field3: null;
    log_field4: null;
    log_field5: number;
    shops: [];

    constructor(userId) {
        this.log_field2 = 807;
        this.log_field5 = userId;
    }
}