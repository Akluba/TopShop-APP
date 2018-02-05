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
