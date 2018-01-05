import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { SetupService } from './setup.service';

declare var $: any;

@Component({
    selector: 'setup-field-table',
    templateUrl: 'template-field-table.component.html'
})
export class FieldTableComponent implements OnInit {
    @Input() data;

    children;
    apiRoute: string;
    navigateText: string;
    message: {};

    constructor(private _route: ActivatedRoute, private _router: Router, public setupService: SetupService, ) {}

    ngOnInit(): void {
        const data = this.data.response.data;
        this.children = data.children;

        this.apiRoute = this.data.apiRoute;
        if (this.apiRoute === undefined) {
            this.apiRoute = ($.inArray(data.primary.type, ['log', 'notes']) !== -1) ? 'column' : 'option';
        }

        this.navigateText = (this.apiRoute === 'category' ? 'Edit Fields' : 'Edit Field');
    }

    delete(child): void {
        if (confirm(`Are you sure you want to delete: ${child.title}?`)) {
            this.setupService.destroy(child.id, this.apiRoute)
                .subscribe(
                    res => this.onSaveComplete(res),
                    (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
                );
        }
    }

    save(child): void {
        this.setupService.save(child, this.apiRoute)
            .subscribe(
                res => this.onSaveComplete(res),
                (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
            );
    }

    onSaveComplete(res: any): void {
        this.flashMessage({text: res.message, status: 'success'});
    }

    flashMessage(message): void {
        $('.message').addClass(message.status);

        this.message = message;

        $('.message')
        .transition('fade up', 1000)
        .transition('fade up', 1000);
    }

    canNavigate(child_type): boolean {
        if (this.apiRoute === 'category' || ($.inArray(child_type, ['select', 'select_multiple', 'log', 'notes']) !== -1)) {
            return true;
        }

        return false;
    }

    navigateToChild(child): void {
        this._router.navigate([ child.id ], { relativeTo: this._route });
    }

}
