import { Component, Input, OnInit } from '@angular/core';

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

    category;
    field;

    ngOnInit(): void {
        let data = this.data.response.data;
        
        this.ancestor = data.ancestor;
        this.parent   = data.parent;
        this.primary  = data.primary;
        this.children = data.children; 
    }
}