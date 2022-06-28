import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { CPRService } from './cpr.service';

@Component({
    template:
`
<h2 class="ui header">CPR Contact List</h2>
<app-data-table
    [fields]='fields'
    [data]='contacts'
    type='Contact'
    (elementCreated)="save($event)"
    (elementRemoved)="delete($event)">
</app-data-table>
`
})
export class CPRListComponent implements OnInit, OnDestroy {
    contacts: any[];
    fields: any[];
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _cprService: CPRService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.contacts = data.response.data.contact_list;
            this.fields = data.response.data.fields;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save(body): void {
        this._cprService.save(body)
            .subscribe(res => {
                this.contacts.push(res['data']);
            });
    }

    delete(body): void {
        this._cprService.destroy(body)
            .subscribe(res => {
                this.contacts = this.contacts.filter(obj => obj.id !== res['data']['id']);
            });
    }
}
