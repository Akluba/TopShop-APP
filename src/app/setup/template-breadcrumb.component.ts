import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

class BreadCrumb {
    active: boolean;
    title: string;
    link: string;

    constructor(active, title, link) {
        this.active = active;
        this.title = title;
        this.link = link;
    }
}

@Component({
    selector: 'setup-breadcrumb',
    templateUrl: 'template-breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
    @Input() data;

    ancestor;
    parent;
    primary;
    children;

    apiRoute: string;

    sourceClass: string;
    categoryId: number;
    fieldId: number;
    columnId: number;

    breadCrumbs;

    constructor(private _route: ActivatedRoute) {}

    ngOnInit(): void {
        const data = this.data.response.data;

        this.ancestor = data.ancestor;
        this.parent   = data.parent;
        this.primary  = data.primary;
        this.children = data.children;

        this.apiRoute = this.data.apiRoute;
        if (this.apiRoute === undefined) {
            this.apiRoute = ($.inArray(data.primary.type, ['log', 'notes']) !== -1) ? 'column' : 'option';
        }

        this._route.params.subscribe(params => {
            this.sourceClass = params.source_class;
            this.categoryId = params.category_id;
            this.fieldId = params.field_id;
            this.columnId = params.column_id;

            this.configBreadCrumbs();
        });

    }

    configBreadCrumbs(): void {
        if (this.apiRoute === 'category') {
            this.breadCrumbs = [
                new BreadCrumb(true, 'Categories', null)
            ];
        } else if (this.apiRoute === 'field') {
            this.breadCrumbs = [
                new BreadCrumb(false, `Category: ${this.primary.title}`, [ '/setup', this.sourceClass ]),
                new BreadCrumb(true, 'Fields', null)
            ];
        } else if (this.apiRoute === 'option') {
            this.breadCrumbs = [
                new BreadCrumb(false, `Category: ${this.parent.title}`, ['/setup', this.sourceClass]),
                new BreadCrumb(false, `Field: ${this.primary.title}`, [ '/setup', this.sourceClass, this.categoryId ]),
                new BreadCrumb(true, 'Options', null)
            ];

            if (this.columnId) {
                const column = new BreadCrumb(
                    false,
                    `Column: ${this.primary.title}`,
                    ['/setup', this.sourceClass, this.categoryId, this.fieldId ]
                );
                this.breadCrumbs.splice(2, 0, column);
            }
        } else if (this.apiRoute === 'column') {
            this.breadCrumbs = [
                new BreadCrumb(false, `Category: ${this.parent.title}`, ['/setup', this.sourceClass]),
                new BreadCrumb(false, `Field: ${this.primary.title}`, [ '/setup', this.sourceClass, this.categoryId ]),
                new BreadCrumb(true, 'Columns', null)
            ];
        }
    }
}
