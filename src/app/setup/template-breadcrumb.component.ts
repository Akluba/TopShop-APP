import { Component, Input, OnInit } from '@angular/core';

class breadCrumb {
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
export class BreadcrumbComponent implements OnInit{
    @Input() data;

    ancestor;
    parent;
    primary;
    children;

    apiRoute: string;
    activeSection: string;

    breadCrumbs: {};

    ngOnInit(): void {
        let data = this.data.response.data;
        
        this.ancestor = data.ancestor;
        this.parent   = data.parent;
        this.primary  = data.primary;
        this.children = data.children; 

        this.apiRoute      = this.data.apiRoute;
        this.activeSection = this.data.activeSection;

        this.configBreadCrumbs();
    }

    configBreadCrumbs(): void {
        if (this.activeSection === 'categories') {
            this.breadCrumbs = [
                new breadCrumb(true, "Categories", null)
            ];
        }
        else if (this.activeSection === 'fields') {
            this.breadCrumbs = [
                new breadCrumb(false, `Category: ${this.primary.title}`, ['/setup']),
                new breadCrumb(true, "Fields", null)
            ];
        }
        else if (this.activeSection === 'field-options' || this.activeSection === 'field-columns') {
            let activeTitle = (this.activeSection === 'field-columns' ? 'Columns' : 'Options')
            this.breadCrumbs = [
                new breadCrumb(false, `Category: ${this.parent.title}`, ['/setup']),
                new breadCrumb(false, `Field: ${this.primary.title}`, ['/setup', this.parent.id]),
                new breadCrumb(true, activeTitle, null)
            ];
        }
        else if (this.activeSection === 'column-options') {
            this.breadCrumbs = [
                new breadCrumb(false, `Category: ${this.ancestor.title}`, ['/setup']),
                new breadCrumb(false, `Field: ${this.parent.title}`, ['/setup', this.ancestor.id]),
                new breadCrumb(false, `Column: ${this.primary.title}`, ['/setup', this.ancestor.id, this.parent.id, 'columns']),
                new breadCrumb(true, 'Options', null)
            ];
        }
    }
}