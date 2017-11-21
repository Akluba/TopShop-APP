import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SetupService } from './setup.service';

declare var $ :any;

@Component({
    templateUrl: './setup-segments.component.html'
})
export class SetupSegmentsComponent implements OnInit{
    pageTitle: string = 'Setup Shop Fields';
    errorMessage: string;
    successMessage: string;
    data: {};

    constructor(private _route: ActivatedRoute, private _setupService: SetupService){}

    ngOnInit(): void {
        this._route.data.subscribe(data => {
            this.data = data;
        });
    }
}