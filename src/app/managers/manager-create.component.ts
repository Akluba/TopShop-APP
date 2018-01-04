import { Component, OnInit } from '@angular/core';

import { ManagerService } from './manager.service';

declare let $: any;

class Manager {
    id = 0;
    manager_name: string = null;
}

@Component({
    selector    : 'manager-create',
    templateUrl : 'manager-create.component.html'
})
export class ManagerCreateComponent implements OnInit {
    newManager: {};

    constructor(private _managerService: ManagerService) {}

    ngOnInit(): void {
        this.newManager = new Manager();
    }

    initiateModal(): void {
        // temp-fix: check to see if a create modal already exists.
        // if so, remove the previous element.
        if ($('.manager-create').length > 1) {
            $('.manager-create').slice(1).remove();
        }

        // modal settings
        $('.manager-create')
        .modal({
            closable  : false,
            onApprove : () => {
                this.save();
                return false;
            }
        })
        .modal('show');
    }

    save(): void {
        this._managerService.save(this.newManager)
            .subscribe(
                res => console.log(res),
                (error: any) => console.log(<any>error),
                () => {
                    $('.manager-create').modal('hide');
                    this.newManager = new Manager();
                }
            );
    }
}
