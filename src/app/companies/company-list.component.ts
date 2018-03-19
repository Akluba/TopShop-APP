import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CompanyService } from './company.service';

@Component({
    template:
`
<h2 class="ui header">Shop List</h2>
<app-data-table
    [fields]='fields'
    [data]='companies'
    type='Company'
    (elementCreated)="save($event)"
    (elementRemoved)="delete($event)">
</app-data-table>
`
})
export class CompanyListComponent implements OnInit, OnDestroy {
    companies: any[];
    fields: any[];
    private sub: Subscription;
    constructor (private _route: ActivatedRoute, private _companyService: CompanyService) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.companies = data.response.data.company_list;
            this.fields = data.response.data.fields;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save(body): void {
        this._companyService.save(body)
            .subscribe(res => {
                this.companies.push(res['data']);
            });
    }

    delete(body): void {
        this._companyService.destroy(body)
            .subscribe(res => {
                this.companies = this.companies.filter(obj => obj.id !== res['data']['id']);
            });
    }
}
