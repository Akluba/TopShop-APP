import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    template: `
    <div class="ui container">
        <h1>{{ pageTitle }}</h1>
        <router-outlet></router-outlet>
    </div>
    `
})
export class FieldEditComponent implements OnInit{
    pageTitle: string = 'Setup Shop Fields';
    field: any;

    constructor(private _router: Router, private _route: ActivatedRoute){}

    ngOnInit(): void {
        this.field = this._route.snapshot.data['field'].data;

        if (this.field.type === 'log'){
            this._router.navigate(['columns'], { relativeTo: this._route });
        }
        else {
            this._router.navigate(['options'], { relativeTo: this._route });
        }
    }
}