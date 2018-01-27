import { Component, Input, AfterViewInit } from '@angular/core';
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
    <app-existing-note class="ui segment event"
        *ngFor="let note of notes.controls | slice:1; let i=index"
        attr.data-note="{{ field.id }}-{{ i }}"
        [note]="note"
        [index]="i"
        [field]="field">
    </app-existing-note>
</div>

<!-- Existing Note Feed -->
<!-- div class="ui feed">
    <div class="ui segment event" *ngFor="let note of notes.controls | slice:1; let i=index"
        attr.data-note="{{ field.id }}-{{i}}">
        <div class="label"></div>
        <div class="content">
            <div class="summary">
                <div class="user">{{ note.get('log_field1').value }}</div>
                <div class="date">{{ note.get('log_field2').value }}</div>

                <div class="ui basic icon right floated action button"><i class="ellipsis horizontal icon"></i></div>
                <div class="ui popup transition hidden">
                    <div class="ui link list">
                        <a class="item"
                            (click)="editNote(i)">
                            <i class="edit icon"></i> Edit Note
                        </a>
                        <a class="item"
                            (click)="deleteNote(i, note)">
                            <i class="trash icon"></i> Delete Note
                        </a>
                    </div>
                </div>

            </div>
            <div class="extra text">
                <div class="static text transition">{{ note.get('log_field3').value }}</div>
                <div class="text field transition hidden">
                    <textarea value="{{ note.get('log_field3').value }}"
                        rows="2"
                        style="resize: none;">
                    </textarea>
                    <div class="ui small right floated buttons">
                        <div class="ui button"
                            (click)="editNote(i)">
                            Cancel
                        </div>
                        <div class="or"></div>
                        <div class="ui positive button"
                            (click)="editNote(i, note)">
                            Keep Changes
                        </div>
                    </div>
                    <div style="clear:both"></div>
                </div>
            </div>
            <div class="meta" *ngIf="metaRecordExist(field.columns, note)">
                <span *ngFor="let column of metaColumns(field.columns, note)" [ngSwitch]="column.type">

                    <a *ngSwitchCase="'manager_link'" class="ui label"
                        [routerLink]="['/managers', note.value[column.column_name]]">
                        <i class="blue linkify icon"></i>
                        {{ linkText(column, note) }}
                    </a>

                    <a *ngSwitchCase="'shop_link'" class="ui label"
                        [routerLink]="['/shops', note.value[column.column_name]]">
                        <i class="blue linkify icon"></i>
                        {{ linkText(column, note) }}
                    </a>

                    <div *ngSwitchCase="'reminder_date'" class="ui label">
                        <i class="blue calendar icon"></i>
                        <div class="detail">{{ note.value[column.column_name] }}</div>
                    </div>

                </span>
            </div>
        </div>
    </div>
</div> -->
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
