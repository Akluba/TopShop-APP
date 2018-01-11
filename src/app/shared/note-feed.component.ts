import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

declare let $: any;

@Component({
    selector: 'note-feed',
    styles: [`
    .ui.feed .event { background: #fff; margin-bottom: 10px; }
    `],
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
    <div class="ui segment event" *ngFor="let note of notes.controls | slice:1; let i=index"
        attr.data-note="{{ field.id }}-{{i}}">
        <div class="label">
            <i class="middle aligned red large minus link icon"
                (click)="deleteNote(i, note)">
            </i>
        </div>
        <div class="content">
            <div class="summary">
                <div class="user">{{ note.get('log_field1').value }}</div>
                <div class="date">{{ note.get('log_field2').value }}</div>
            </div>
            <div class="extra text">
                {{ note.get('log_field3').value }}
            </div>
            <div class="meta" *ngIf="metaRecordExist(field.columns, note)">
                <span *ngFor="let column of metaColumns(field.columns, note)" [ngSwitch]="column.type">

                    <a *ngSwitchCase="'manager_link'"
                        [routerLink]="['/managers', note.value[column.column_name]]">
                        <i class="blue linkify icon"></i>
                        {{ linkText(column, note) }}
                    </a>

                    <a *ngSwitchCase="'shop_link'"
                        [routerLink]="['/shops', note.value[column.column_name]]">
                        <i class="blue linkify icon"></i>
                        {{ linkText(column, note) }}
                    </a>

                </span>
            </div>
        </div>
    </div>
</div>
`
})
export class NoteFeedTemplate {
    @Input() field;
    @Input() notes;
    constructor(private _router: Router) {}

    metaRecordExist(columns, note): boolean {
        for (let i = 0; i < columns.length; i++) {
            if (!columns[i]['system'] && note.value[columns[i]['column_name']]) {
                return true;
            }
        }

        return false;
    }

    metaColumns(columns, note) {
        return columns.filter(column => column.system !== 1 && note[column.column_name] !== null);
    }

    linkText(column, note): string {
        const linkName = (column.type === 'manager_link') ? 'manager_name' : 'shop_name';
        const value = note.value[column.column_name];
        const options = column.options;

        return options[options.indexOf(options.find(x => x.id === +value))][linkName];
    }

    deleteNote(i, note): void {
        console.log(i);
        // confirm the user wishes to delete the item.
        if (confirm(`Are you sure you wish to remove this note from ${this.field.title}`)) {
            // add disabled classes.
            $(`div[data-note='${this.field.id}-${i}']`).addClass('disabled');

            // add key to form group to signify marked to delete.
            note.patchValue({deleted: true});

            // mark log entry as dirty so changes can be saved.
            note.markAsDirty();
        }
    }

}
