import {  PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'shopFilter'
})
export class  ShopFilterPipe implements PipeTransform {
    transform(value: any[], filterBy: string): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((shop: any) =>
            shop.shop_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}

@Pipe({
    name: 'shopSort'
})
export class ShopSortPipe implements PipeTransform {
    transform(array: Array<any>, args: string): Array<any> {
        array.sort((a: any, b: any) => {
            if (a.shop_name < b.shop_name) {
              return -1;
            } else if (a.shop_name > b.shop_name) {
              return 1;
            } else {
              return 0;
            }
        });

        return array;
    }
}
