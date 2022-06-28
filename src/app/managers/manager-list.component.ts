import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ManagerService } from './manager.service';

@Component({
    template:
`
<h2 class="ui header">Manager List</h2>
<app-data-table
    [fields]='fields'
    [data]='managers'
    type='Manager'
    (elementCreated)="save($event)"
    (elementRemoved)="delete($event)">
</app-data-table>
`
})
export class ManagerListComponent implements OnInit, OnDestroy {
    managers: any[];
    fields: any[];
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _managerService: ManagerService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.managers = data.response.data.manager_list;
            this.fields = data.response.data.fields;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save(body): void {
        this._managerService.save(body)
            .subscribe(res => {
                this.managers.push(res['data']);
            });
    }

    delete(body): void {
        this._managerService.destroy(body)
            .subscribe(res => {
                this.managers = this.managers.filter(obj => obj.id !== res['data']['id']);
            });
    }
}
