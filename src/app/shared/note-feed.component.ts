import { Component, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare let $: any;

@Component({
    selector: 'note-feed',
    styles: [
        `
            .ui.feed .event { background: #fff; margin-bottom: 10px; }
        `
    ],
    template:
`
<!-- Create New Note -->
<div class="ui segment">
    <div *ngFor="let note of notes.controls | slice:0:1">
        <div *ngFor="let column of field.columns">
            <div *ngIf="!column.system || column.column_name === 'log_field3'">
                <field-control
                    [formGroup]="note"
                    [control]="column">
                </field-control>
            </div>
        </div>
    </div>
</div>

<!-- Existing Note Feed -->
<div class="ui feed">
    <app-existing-note class="ui segment event"
        *ngFor="let note of notes.controls | slice:1; let i=index"
        attr.data-note="{{ field.id }}-{{ i }}"
        [note]="note"
        [index]="i"
        [field]="field">
    </app-existing-note>
</div>
`
})
export class NoteFeedTemplate implements AfterViewInit {
    @Input() field;
    @Input() notes;
    constructor(private _router: Router) {}

    ngAfterViewInit(): void {
        $('.action.button')
            .popup({
                position: 'left center',
                inline: true,
                on: 'click'
            });
    }

}
