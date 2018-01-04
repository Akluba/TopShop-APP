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
