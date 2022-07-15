import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  @Input() fields: any[];
  @Input() defaultCols: any[];
  @Input() data: any[];
  @Input() key: string;
  @Input() service: any;
  @Output() navigateTo = new EventEmitter<any>();
  @Output() elementRemoved = new EventEmitter<any>();


  tableColumns = [];

  ngOnInit(): void {
    this.setTableColumns();
  }

  setTableColumns(): void {
    for (const field of Object.keys(this.fields)) {
        this.tableColumns.push( new Column(
            this.fields[field]['column_name'],
            this.fields[field]['title'],
            this.fields[field]['type'],
            this.fields[field]['options'],
        ));
    }
  }

  remove(e): void {
    const isCanceled = new Promise((resolve, reject) => {
      this.service.destroy(e.key)
      .then(() => resolve(false))
      .catch(e => reject(e))
    });

    e.cancel = isCanceled;
  }

  onViewClick = (e) => {
    console.log(e.row.key);
    this.navigateTo.emit(e.row.key);
  }

}

export class Column {
  field: string;
  caption: string;
  type: string;
  options: any[];

  constructor(field, caption, type, options?) {
      this.field = field;
      this.caption = caption;
      this.type = type;
      this.options = this.formatOptions(options);
  }

  formatOptions(options): any[] {
      if (options === undefined || options.length < 0) {
          return null;
      }

      const formattedOptions = [];

      for (const option of Object.keys(options)) {
          formattedOptions.push({
              label: options[option]['title'],
              value: options[option]['title']
          });
      }

      return formattedOptions;
  }
}
