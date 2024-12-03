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
  @Input() newObjFields: any[];
  @Input() confirmDeleteMsg = 'Are you sure you want to delete this record?';
  @Output() navigateTo = new EventEmitter<any>();

  tableColumns = [];
  headerFilters: {};
  filterOperations = ["contains", "endswith", "=", "startswith"];

  ngOnInit(): void {
    this.headerFilters = {...this.headerFilters, default:true}
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

        if (this.fields[field]['type'] === 'select_multiple') {
          this.headerFilters = { ...this.headerFilters, [field]: {
            dataSource: {
              store: {
                type: "array",
                data: Object.values(this.fields[field]['options'])
              },
              map: this.optionToFilterItem,
              sort: "title"
            }}
          };
        }
    }
  }

  isDefaultCol(col): boolean {
    if (!this.defaultCols.length) return true;

    return this.defaultCols.includes(col.field)
  }

  sortColumn(setting, col): any {
    if (col.field != 'name') return;

    return (setting === 'i') ? 0 : 'asc';
  }

  onViewClick = (e) => {
    this.navigateTo.emit(e.row.key);
  }

  optionToFilterItem(item) {
    return {
      text: item.title,
      value: item.title
    };
  }

  calculateFilterExpression(filterValue, selectedFilterOperation, target) {
    let column = this as any;
  
    if (filterValue && column.headerFilter) {
      let selector = (data) => {
        let applyOperation = (arg1, arg2, op) => {
          if (op === "=") return arg1 === arg2;
          if (op === "contains") return arg1.includes(arg2);
          if (op === "startswith") return arg1.startsWith(arg2);
          if (op === "endswith") return arg1.endsWith(arg2);
        };

        let values = column.calculateCellValue(data);
        return (
          values &&
          !!values.find((v) =>
            applyOperation(v, filterValue, selectedFilterOperation)
          )
        );
      };
      return [selector, "=", true];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
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
