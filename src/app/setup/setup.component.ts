import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SetupService } from './setup.service';

@Component({
    templateUrl: './setup.component.html'
})
export class SetupComponent implements OnInit{
    pageTitle: string = 'Setup Shop Fields';
    data: {};

    constructor(private _route: ActivatedRoute, private _setupService: SetupService){}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.data = data;
        });
    }
}