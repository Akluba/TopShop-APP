import {  PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'managerFilter'
})
export class  ManagerFilterPipe implements PipeTransform {
    transform(value: any[], filterBy: string): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((manager: any) =>
            manager.manager_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
