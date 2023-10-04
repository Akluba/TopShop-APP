import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: './shs.component.html'
})
    export class SHSComponent implements OnInit, OnDestroy {
        shopData: any;
        
        private sub: Subscription;

        constructor(private _route: ActivatedRoute) {}

        ngOnInit(): void {
            this.sub = this._route.data.subscribe(data => {

                this.shopData = new DataSource({
                    store: new CustomStore({
                        key: 'id',
                        load: () => data.response.data.shop_list
                    })
                });
            });
        }

        ngOnDestroy(): void {
            this.sub.unsubscribe();
        }
    }