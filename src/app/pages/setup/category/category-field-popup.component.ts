import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-category-field-popup',
    templateUrl: 'category-field-popup.component.html',
    styles: []
})
export class CategoryFieldPopupComponent implements OnInit {
    @Input() visible;
    @Input() model;
    @Input() categoryOptions;

    @Output() hide = new EventEmitter<any>();

    title: string;
    categoryDispVal: string = undefined;
    typeFieldDisabled: boolean = true;

    constructor() { }

    ngOnInit(): void {
        this.title = `Add ${this.model.hasOwnProperty("category_id") ? 'Field' : 'Field Category'}`;

        this.categoryOptions['onValueChanged'] = (e) => this.categoryChange(e);
    }

    categoryChange(e) {
        
        this.categoryDispVal = e.component.option('displayValue')
        if (this.categoryDispVal == 'Notes') {
            this.typeFieldDisabled = true;
            this.model.type = 'notes';
            return;
        }

        this.typeFieldDisabled = !e.value;
    }

    onCancel = () => {
        this.hide.emit();
    }
}

// Notes
// { value: 'manager_link', title: 'Link to Manager' },
// { value: 'shop_link', title: 'Link to Shop' },
// { value: 'reminder_date', title: 'Reminder Date' }
                    
// { value: 'text', title: 'Text' },
// { value: 'checkbox', title: 'Checkbox' },
// { value: 'select', title: 'Select' },
// { value: 'select_multiple', title: 'Select Multiple' },
// { value: 'textarea', title: 'Text Area' }

// { value: 'log', title: 'Logging Field' }