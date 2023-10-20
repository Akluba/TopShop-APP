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
                        load: () => data.response.data.shops
                    })
                });
            });
        }

        ngOnDestroy(): void {
            this.sub.unsubscribe();
        }

        onCellPrepared (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "health_score.score" ||
                    e.column.dataField === "health_score.effort" ||
                    e.column.dataField === "health_score.opportunity" ||
                    e.column.dataField === "health_score.success"
                )
                {
                    const c = e.value >= 7 ? 'green' : e.value >= 4 ? 'yellow' : 'red';
                    e.cellElement.classList.add(c);
                }
            }
        }
    }