import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'note-feed',
    template:
`
<div class="ui feed">

    <!-- Create New Note -->
    <div class="ui secondary segment">
        <div *ngFor="let column of field.columns">
            <div class="ui grid middle aligned content"
                *ngIf="!column.system || column.column_name === 'log_field3'">
                <div class="right aligned three wide column">
                    <label>{{ column.title }}</label>
                </div>
                <div class="twelve wide column"
                    *ngFor="let note of newNote.controls">
                    <field-control
                        [formGroup]="note"
                        [control]="column">
                    </field-control>
                </div>
            </div>
        </div>
    </div>

    <!-- Existing Notes -->
    <div class="event" *ngFor="let note of existingNotes">
        <div class="label"></div>
        <div class="content">
            <div class="summary">
                <div class="user">{{ note.log_field1 }}</div>
                <div class="date">{{ note.log_field2 }}</div>
            </div>
            <div class="extra text">{{ note.log_field3 }}</div>
            <div class="meta" *ngIf="metaRecordExist(field.columns, note)">
                <span *ngFor="let column of metaColumns(field.columns, note)" [ngSwitch]="column.type">

                    <!-- Manager Link -->
                    <a *ngSwitchCase="'manager_link'"
                        [routerLink]="['/managers', note[column.column_name]]">
                        <i class="blue linkify icon"></i>
                        {{ linkText(column, note) }}
                    </a>

                    <!-- Shop Link -->
                    <a *ngSwitchCase="'shop_link'"
                        [routerLink]="['/shops', note[column.column_name]]">
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
    @Input() existingNotes;
    @Input() newNote;

    constructor(private _router: Router) {}

    metaRecordExist(columns, note): boolean {
        for (let i = 0; i < columns.length; i++) {
            if (!columns[i]['system'] && note[columns[i]['column_name']]) {
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
        const value = note[column.column_name];
        const options = column.options;

        return options[options.indexOf(options.find(x => x.id === +value))][linkName];
    }

}
