import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortOrder'
})
export class SortOrderPipe implements PipeTransform {
    transform(array: any[], args: string): any[] {
        return array.sort(this.compare);
    }

    compare(a, b): number {
        const sortA = a.sort_order;
        const sortB = b.sort_order;

        let comparison = 0;

        if (sortA > sortB) {
            comparison = 1;
        } else if (sortA < sortB) {
            comparison = -1;
        }

        return comparison;
    }
}

@Pipe({
    name: 'sortABC'
})
export class SortABCPipe implements PipeTransform {
    transform(array: any, field: string): any[] {
        array.sort((a: any, b: any) => {
          if (a['name'] < b['name']) {
            return -1;
          } else if (a['name'] > b['name']) {
            return 1;
          } else {
            return 0;
          }
        });
        return array;
    }
}
