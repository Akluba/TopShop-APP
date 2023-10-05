import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: './shs.component.html',
    styleUrls:['./shs.component.css']
})
    export class SHSComponent implements OnInit, OnDestroy {
        shopData: any;
        
        private sub: Subscription;

        constructor(private _route: ActivatedRoute) {}

        ngOnInit(): void {
            this.sub = this._route.data.subscribe(data => {

                // REPLACE WITH REAL DATA
                let modData = data.response.data.shop_list.map(v => ({...v, score: 5}));
                modData = modData.map(v => ({...v, effort: 7}));
                modData = modData.map(v => ({...v, potential: 1}));
                modData = modData.map(v => ({...v, success: 6}));

                this.shopData = new DataSource({
                    store: new CustomStore({
                        key: 'id',
                        load: () => modData
                    })
                });
            });
        }

        ngOnDestroy(): void {
            this.sub.unsubscribe();
        }

        onCellPrepared (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "score" ||
                    e.column.dataField === "effort" ||
                    e.column.dataField === "potential" ||
                    e.column.dataField === "success"
                )
                {
                    const c = e.value >= 7 ? 'green' : e.value >= 4 ? 'yellow' : 'red';
                    e.cellElement.classList.add(c);
                }
            }
        }
    }