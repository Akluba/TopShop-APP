import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Column, SetupElement } from './SetupClasses';
import { SetupService } from './setup.service';

declare var $: any;

@Component({
    selector: 'app-setup-table',
    templateUrl: 'setup-table.component.html',
    styles: [
        `
            .ui.table { border: none; }
            .non-edit-text { font-style: oblique; }
            .edit-text { border-bottom: 1px dotted #00F; }
            .ui.table td:last-child, .ui.table th:last-child { border-right: none; }
        `
    ]
})
export class SetupTableComponent implements OnInit, AfterViewInit {
    @Input() apiRoute;
    @Input() routeParams;
    @Input() primary;
    columns: any[];
    newElement: SetupElement;
    typeOptions: any[];

    constructor(public setupService: SetupService, private _route: ActivatedRoute, private _router: Router) {}

    ngOnInit(): void {
        if (this.apiRoute === undefined) {
            this.apiRoute = ($.inArray(this.primary.type, ['log', 'notes']) !== -1) ? 'column' : 'option';
        }

        this.setColumns();
        this.initNewSetupElement();
        this.setTypeOptions();
    }

    ngAfterViewInit(): void {
        $('.dropdown').dropdown();
    }

    setColumns(): void {
        this.columns = [
            new Column('title', 'Title', 'text', true)
        ];

        if (this.apiRoute === 'field' || this.apiRoute === 'column') {
            this.columns.push(new Column('type', 'Type', 'select', false));
        }
    }

    initNewSetupElement(): void {
        const sort_order = this.setupService.children.length;

        switch (this.apiRoute) {
            case 'category':
                this.newElement = new SetupElement(sort_order, this.routeParams.source_class);
                break;
            case 'field':
                this.newElement = new SetupElement(sort_order, this.routeParams.source_class, undefined, this.routeParams.category_id, undefined, null);
                break;
            case 'option':
                const source_class = this.routeParams.column_id ? 'CustomFieldLogColumn' : 'CustomField';
                const source_id = this.routeParams.column_id ? this.routeParams.column_id : this.routeParams.field_id;
                this.newElement = new SetupElement(sort_order, source_class, source_id);
                break;
            case 'column':
                this.newElement = new SetupElement(sort_order, undefined, undefined, undefined, this.routeParams.field_id, null);
                break;
        }

    }

    setTypeOptions(): void {
        if (this.apiRoute === 'field' || this.apiRoute === 'column') {
            if (this.primary.title === 'Notes') {
                this.typeOptions = [{ value: 'notes', title: 'Note Collection' }];
            } else if (this.primary.type === 'notes') {
                this.typeOptions = [
                    { value: 'manager_link', title: 'Link to Manager' },
                    { value: 'shop_link', title: 'Link to Shop' },
                    { value: 'reminder_date', title: 'Reminder Date' }
                ];
            } else {
                this.typeOptions = [
                    { value: 'text', title: 'Text' },
                    { value: 'checkbox', title: 'Checkbox' },
                    { value: 'select_multiple', title: 'Select' },
                    { value: 'textarea', title: 'Select Multiple' },
                    { value: 'notes', title: 'Text Area' }
                ];

                if (this.apiRoute === 'field') {
                    this.typeOptions.push({ value: 'log', title: 'Logging Field' });
                }
            }
        }
    }

    create(): void {
        this.setupService.save(this.newElement, this.apiRoute)
        .subscribe(() => {
            $('.dropdown').dropdown('clear');
            this.initNewSetupElement();
        });
    }

    save(input, data): void {
        if (input.dirty && input.valid) {
            this.setupService.save(data, this.apiRoute)
                .subscribe(
                    res => this.flashResponse(data.id, 'positive'),
                    () => this.flashResponse(data.id, 'error')
                );
        }
    }

    delete(id: number, title: string): void {
        if (confirm(`Are you sure you want to delete: ${title}?`)) {
            this.setupService.destroy(id, this.apiRoute)
                .subscribe(
                    null,
                    () => this.flashResponse(id, 'error')
                );
        }
    }

    canNavigate(data_type): boolean {
        if (this.apiRoute === 'category' || ($.inArray(data_type, ['select', 'select_multiple', 'log', 'notes']) !== -1)) {
            return true;
        }

        return false;
    }

    navigateTo(id): void {
        this._router.navigate([ id ], { relativeTo: this._route });
    }

    private flashResponse(id: number, trClass: string): void {
        const tr = $(`tr[data-id='${id}']`);
        tr.addClass(trClass);
        setTimeout(() => tr.removeClass(trClass), 1000);
    }
}
