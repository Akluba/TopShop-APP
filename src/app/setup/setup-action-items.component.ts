import { Component, Input } from '@angular/core';

import { SetupService } from './setup.service';

@Component({
    selector: 'setup-action-items',
    templateUrl: 'setup-action-items.component.html'
})
export class ActionItemsComponent {
    @Input() route;
    @Input() items;

    constructor(private _setupService: SetupService) {}

    delete(item): void {
        if(confirm(`Are you sure you want to delete the ${this.route}: ${item.title}?`)) {
            this._setupService.destroy(item.id, {route: this.route})
                .subscribe(
                    res => this.onSaveComplete(res),
                    //(error: any) => this.errorMessage = <any>error
                );
        }
    }

    save(item): void {
        this._setupService.save(item, {route: this.route})
        .subscribe(
            res => this.onSaveComplete(res),
            // (error: any) => this.errorMessage = <any>error
        )
    }

    onSaveComplete(res: any): void {
        if (res.method === 'create') {
            this.items.push(res.data);
        }
        else if (res.method === 'delete') {
            this.items = this.items.filter(obj => obj.id != res.data.id);
        }
        
        //this.successMessage = column.message;
    }
}