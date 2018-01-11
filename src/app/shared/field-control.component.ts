import { Component, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare let $: any;

@Component({
    selector: 'field-control',
    template:
`
<div [ngSwitch]="control.type" [formGroup]="formGroup">

    <!-- Text Input -->
    <input *ngSwitchCase="'text'" type="text" formControlName="{{ control.column_name }}" />

    <!-- Checkbox -->
    <div *ngSwitchCase="'checkbox'" class="ui toggle checkbox">
        <input type="checkbox" tabindex="0" class="hidden" formControlName="{{ control.column_name }}">
    </div>

    <!-- Select -->
    <select *ngSwitchCase="'select'" class="ui fluid dropdown"
        formControlName="{{ control.column_name }}">
        <option value="">Select an Option</option>
        <option *ngFor="let option of control.options"
            value="{{ option.id }}">{{ option.title }}
        </option>
    </select>

    <!-- Select Multiple -->
    <select *ngSwitchCase="'select_multiple'" multiple="" class="ui fluid dropdown"
        formControlName="{{ control.column_name }}">
        <option *ngFor="let option of control.options"
            value="{{ option.id }}">{{ option.title }}
        </option>
    </select>

    <!-- Textarea -->
    <textarea *ngSwitchCase="'textarea'" rows="2" formControlName="{{ control.column_name }}"></textarea>

    <!-- Note Text -->
    <div *ngSwitchCase="'note_text'">
        <textarea formControlName="{{ control.column_name }}"
            rows="2"
            placeholder="Enter a new note.."
            style="border: none; resize: none;">
        </textarea>
        <div class="ui divider"></div>
    </div>

    <!-- Manager Link -->
    <select *ngSwitchCase="'manager_link'" class="ui fluid dropdown"
        formControlName="{{ control.column_name }}">
        <option value="">Select a Manager</option>
        <option *ngFor="let option of control.options"
            value="{{ option.id }}">{{ option.manager_name }}
        </option>
    </select>

    <!-- Shop Link -->
    <select *ngSwitchCase="'shop_link'" class="ui fluid dropdown"
        formControlName="{{ control.column_name }}">
        <option value="">Select a Shop</option>
        <option *ngFor="let option of control.options"
            value="{{ option.id }}">{{ option.shop_name }}
        </option>
    </select>

</div>
`
})
export class FieldControlTemplate implements AfterViewInit {
    @Input()
    public formGroup: FormGroup;

    @Input()
    public control;

    ngAfterViewInit(): void {
        $('.dropdown').dropdown();
        $('.checkbox').checkbox();
    }
}
