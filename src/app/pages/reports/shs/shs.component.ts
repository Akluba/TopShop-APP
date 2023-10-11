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
        optArray: any[] = [];
        
        private sub: Subscription;

        constructor(private _route: ActivatedRoute) {}

        ngOnInit(): void {
            this.sub = this._route.data.subscribe(data => {

                // REPLACE WITH REAL DATA
                let modData = data.response.data.shops.map(v => ({...v, score: 5}));
                modData = modData.map(v => ({...v, effort: 7}));
                modData = modData.map(v => ({...v, potential: 1}));
                modData = modData.map(v => ({...v, success: 6}));

                // creating lookups for field options
                data.response.data.field.columns.forEach(col => {
                    let selector = (col.column_name === 'source_id' || col.column_name === 'log_field4') ? 'name' : 'sort_order';
                    this.optArray[col.column_name] = {
                        store: col.options,
                        sort: selector,
                    };
                });

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