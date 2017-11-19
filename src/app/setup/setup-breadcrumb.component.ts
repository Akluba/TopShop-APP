import { Component, Input } from '@angular/core';

@Component({
    selector: 'setup-breadcrumb',
    templateUrl: 'setup-breadcrumb.component.html'
})
export class BreadcrumbComponent {
    @Input() category;
    @Input() field;
    @Input('options') fieldOptions;
    @Input('columns') fieldColumns;
    @Input() column;
}