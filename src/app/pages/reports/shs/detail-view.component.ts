import { DatePipe } from '@angular/common';
import { Component, AfterViewInit, Input } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

@Component({
    selector: 'detail-view',
    templateUrl: './detail-view.component.html'
  })
  export class DetailViewComponent implements AfterViewInit {
    @Input() key: number;
    
    effortData: DataSource;
    
    ngAfterViewInit() {
        let testData = {
            effortId: this.key,
            company: 'Test',
            created: '10/05/23',
            lastUpdated: '10/05/23',
            status: 'Information Sent',
            outcome: null,
        }

        this.effortData = new DataSource({
            store: new CustomStore({
                key: 'effortId',
                load: () => [testData]
            })
        });
    }

    customizeDate(data) {
        return `Latest ME: ${new DatePipe('en-US').transform(data.value, 'MMM dd, yyyy')}`;
      }
  }