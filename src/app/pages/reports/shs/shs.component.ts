import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
    template: `
        <div>
            Shop Health Score Report
        </div>
    `})
    export class SHSComponent implements OnInit, OnDestroy {
        
        private sub: Subscription;

        constructor(private _route: ActivatedRoute) {}

        ngOnInit(): void {
            this.sub = this._route.data.subscribe(data => {
                
            });
        }

        ngOnDestroy(): void {
            this.sub.unsubscribe();
        }
    }