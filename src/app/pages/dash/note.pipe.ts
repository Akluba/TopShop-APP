import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noteSort'
})
export class NoteSortPipe implements PipeTransform {
    transform(array: any[], args: string): any[] {
        return array.sort(this.compare);
    }

    compare(a, b): number {
        const sortA = Number(new Date(a.created_date));
        const sortB = Number(new Date(b.created_date));

        let comparison = 0;

        if (sortA > sortB) {
            comparison = -1;
        } else if (sortA < sortB) {
            comparison = 1;
        }

        return comparison;
    }
}
