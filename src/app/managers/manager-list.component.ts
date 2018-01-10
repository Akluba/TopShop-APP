import { Component } from '@angular/core';

import { ManagerService } from './manager.service';

@Component({
    templateUrl: 'manager-list.component.html'
})
export class ManagerListComponent {
    listFilter: string;
    constructor(public managerService: ManagerService) {}

    delete(manager): void {
        if (confirm(`Are you sure you want to delete: ${manager.manager_name}?`)) {
            this.managerService.destroy(manager.id)
                .subscribe();
        }
    }
}
