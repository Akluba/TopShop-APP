import { DatePipe } from '@angular/common';
import { Component, AfterViewInit, Input } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { firstValueFrom } from 'rxjs';
import { ReportService } from '../report.service';

@Component({
    selector: 'detail-view',
    templateUrl: './detail-view.component.html'
  })
  export class DetailViewComponent implements AfterViewInit {
    @Input() key: number;
    @Input() optArray: any[];
    
    effortData: DataSource;
    openCount: number = 0;

    constructor (private _rs: ReportService) {}
    
    ngAfterViewInit() {
        this.effortData = new DataSource({
            store: new CustomStore({
                key: 'id',
                load: () => this.load()
            })
        });
    }

    load(): any {
        let result = this._rs.show(this.key);

        return firstValueFrom(result)
            .then((resp: any) => resp.data)
            .catch((e) => {
                throw e && e.error && e.error.Message;
            });
    }

    calculateCustomSummaries(options) {
        switch(options.name) {
            case 'LastMarketingEffort':
                if (options.summaryProcess === 'start') {
                    options.totalValue = [];
                } else if (options.summaryProcess === 'calculate') {
                        options.totalValue.push(options.value);
                } 
                else if (options.summaryProcess === 'finalize') {
                    if (options.totalValue.length == 0) {
                        options.totalValue = "-";
                        return;
                    }

                    let mr = new Date(Math.max(...options.totalValue.map(e => new Date(e))));
                    options.totalValue = new DatePipe('en-US').transform(mr, 'MM/dd/yyyy')
                }
            break;
            case 'LastDRPAdded':
                if (options.summaryProcess === 'start') {
                    options.totalValue = [];
                } else if (options.summaryProcess === 'calculate') {
                    if (options.value.log_field3 == 822) {
                        options.totalValue.push(options.value.updated_at);
                    }
                } 
                else if (options.summaryProcess === 'finalize') {
                    if (options.totalValue.length == 0) {
                        options.totalValue = "-";
                        return;
                    }

                    let mr = new Date(Math.max(...options.totalValue.map(e => new Date(e))));
                    options.totalValue = new DatePipe('en-US').transform(mr, 'MM/dd/yyyy')
                }
            break;
            case 'OpenMarketingEfforts':
                if (options.summaryProcess === 'start') {
                    options.totalValue = 0;
                } else if (options.summaryProcess === 'calculate') {
                    if (options.value != 379) {
                        options.totalValue += 1;
                    }
                }
            break;
            case 'DRPsSecured':
                if (options.summaryProcess === 'start') {
                    options.totalValue = 0;
                } else if (options.summaryProcess === 'calculate') {
                    if (options.value == 822) {
                        options.totalValue += 1;
                    }
                }
            break;
        }
    }
  }