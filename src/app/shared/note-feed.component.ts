import { Component, Input } from '@angular/core';

@Component({
    selector: 'note-feed',
    template:
`
<div class="ui feed">

    <!-- Create New Note -->
    <div class="ui secondary segment">
        <div *ngFor="let note of newNote.controls" [formGroup]="note">
            <textarea rows="2" formControlName="log_field3"></textarea>
        </div>
    </div>

    <!-- Existing Notes -->
    <div class="event" *ngFor="let note of existingNotes">
        <div class="content">
            <div class="summary">
                <div class="user">{{ note.log_field1 }}</div>
                <div class="date">{{ note.log_field2 }}</div>
            </div>
            <div class="extra text">{{ note.log_field3 }}</div>
            <div class="meta"></div>
        </div>
    </div>

</div>
`
})
export class NoteFeedTemplate {
    @Input() field;
    @Input() existingNotes;
    @Input() newNote;
}