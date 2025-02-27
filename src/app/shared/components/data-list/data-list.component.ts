import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { PositionConfig } from 'devextreme/animation/position';
import DataSource from 'devextreme/data/data_source';
import { DataListService } from './data-list.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  constructor(private _dlService: DataListService){}

  @Input() fields: any[];
  @Input() filters: any[];
  @Input() defaultCols: any[];
  @Input() data: DataSource;
  @Input() newObjFields: any[];
  @Input() confirmDeleteMsg = 'Are you sure you want to delete this record?';
  @Output() navigateTo = new EventEmitter<any>();

  @ViewChild(DxDataGridComponent, { static: false}) dataGrid!: DxDataGridComponent;

  tableColumns = [];
  headerFilters: {};
  filterOperations = ["contains", "endswith", "=", "startswith", "anyof"];
  insurers: DataSource;
  customOperations: any[] = [];
  currentDRPFilters = [];

  popupPosition: PositionConfig = {
    of: window, at: 'top', my: 'top', offset: { y: 10 },
  };

  ngOnInit(): void {
    this.headerFilters = {...this.headerFilters, default:true}
    this.setTableColumns();
    if (this.filters) this.setCustomFilter();
  }

  setCustomFilter(): void {
    this.insurers = new DataSource({
      store: this.filters['DRP'],
      sort: [ 'name' ]
    });

    let filterApplied = false;
    
    this.customOperations = [{
      name: "excludeDRP",
      caption: "Exclude DRP",
      icon: "filter",
      dataTypes: ["number"],
      editorTemplate: "drpDropdown",
      calculateFilterExpression: (value, field) => {
        if (!value) return null;
        
        const drpFilter = this.filters['DRP'].find(drp => drp.name === value) || null;

        if (!drpFilter || this.currentDRPFilters.includes(drpFilter.id)) return null;
        
        this.currentDRPFilters.push(drpFilter.id);

        return ["drp_filter", "<>", this.currentDRPFilters];
      }
    }]
  }

  setTableColumns(): void {
    for (const field of Object.keys(this.fields)) {
      this.tableColumns.push( new Column(
          this.fields[field]['column_name'],
          this.fields[field]['title'],
          this.fields[field]['type'],
          this.fields[field]['mapped'],
          this.fields[field]['options']
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

    return this.defaultCols.includes(col.dataField)
  }

  customizeColumns = (columns) => {
    columns.forEach((column) => {
      if (column.name === 'buttons' || column.name === 'drp_filter') return;
      columns[column.index].visibleIndex = this.findSortOrder(column.name);
    })
  }

  findSortOrder(column) {
    return this.fields[column]['sort_order'];
  }

  sortColumn(setting, col): any {
    if (col.dataField != 'name') return;

    return (setting === 'i') ? 0 : 'asc';
  }

  onGridOptionChanged(e: any) {
    if (e.name === "filterValue") {
      const previousFilters = this.checkForDRPFilter(e.previousValue);
      const currentFilters = this.checkForDRPFilter(e.value);

      // Determine which DRP Filter(s) were removed
      const removedFilters = previousFilters.filter(drp => !currentFilters.includes(drp));
      // Determine which DRP Filters were added
      const addedFilters = currentFilters.filter(drp => !previousFilters.includes(drp));

      // No DRP Filter changes, return.
      if (addedFilters.length === 0 && removedFilters.length === 0) return;

      // Remove deselected DRP Filters
      this.currentDRPFilters = this.currentDRPFilters.filter(drp => !removedFilters.includes(drp));
      // Add newly selected DRP Filters
      this.currentDRPFilters.push(...addedFilters);
      
      // Update Filter data with new list
      this.handleFilterData(
        this.currentDRPFilters.length > 0
          ? { filter: ["drp_filter", "<>", this.currentDRPFilters]}
          : {}
      )
      
    }
  }

  checkForDRPFilter(filter: any): number[] {
    if (!filter) return [];

    if (Array.isArray(filter) && filter.length === 3 && filter[0] === "drp_filter") {
      const drp = this.filters['DRP'].find(drp => drp.name === filter[2]);
      return drp ? [drp.id] : [];
    }

    // Extract DRP filters from an array of filters
    if (Array.isArray(filter)) {
        return filter 
          .filter(f => Array.isArray(f) && f[0] === "drp_filter")
          .map(f => {
            const drp = this.filters['DRP'].find(drp => drp.name === f[2])
            return drp ? drp.id : null;
          }).filter(id => id !== null);
    }

    return [];
  }

  handleFilterData(filter): Promise <void> {
    this.dataGrid.instance.beginCustomLoading('Filtering');

    return this._dlService.remoteFilter(filter)
      .then((resp) => {
        if (!resp) { throw new Error('No response received from server'); }
        if (resp.error) { throw new Error(resp.message); }

        this.dataGrid.instance.refresh(true);
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => { this.dataGrid.instance.endCustomLoading(); })
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
  dataField: string;
  caption: string;
  dataType: string;
  mapped: string;
  options: any[];

  constructor(field, caption, type, mapped, options?) {
      this.dataField = field;
      this.caption = caption;
      this.dataType = type;
      this.mapped = mapped;
      this.options = this.formatOptions(options);
  }

  formatOptions(options): any[] {
      if (options === undefined || options.length < 0) {
          return null;
      }

      const formattedOptions = [];

      let optParam = this.mapped ? 'name':'title';

      for (const option of Object.keys(options)) {
          formattedOptions.push({
              label: options[option][optParam],
              value: options[option][optParam]
          });
      }

      return formattedOptions;
  }
}

export type Condition = Condition[] | string | number;
export type Fields = Record<string, string | number>[];