import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

declare let $: any;

@Component({
    selector: 'app-existing-note',
    templateUrl: './existing-note.component.html',
    styles: [
        `
            .content > #meta_tags.meta { margin: .8em 0 0; }
            .edit.segment { width: 100%; }
        `
    ],
})
export class ExistingNoteComponent implements OnInit {
    @Input() note;
    @Input() index;
    @Input() field;

    editting = false;
    editNote: FormGroup;
    originalNote: {};

    constructor(private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.originalNote = this.note.value;
    }

    metaData(): boolean {
        const columns = this.field.columns;

        for (let i = 0; i < columns.length; i++) {
            if (!columns[i]['system'] && this.note.value[columns[i]['column_name']]) {
                return true;
            }
        }

        return false;
    }

    metaTags() {
        const columns = this.field.columns;
        return columns.filter(column => column.system !== 1 && this.note[column.column_name] !== null);
    }

    linkText(column): string {
        const linkName = (column.type === 'manager_link') ? 'manager_name' : 'shop_name';
        const value = this.note.value[column.column_name];
        const options = column.options;

        return options[options.indexOf(options.find(x => x.id === +value))][linkName];
    }

    edit(action?: string): void {
        // toggle edit state.
        this.editting = !this.editting;

        if (!action) {
            this.createEditNote();
        } else if (action === 'save') {
            const editNoteVals = this.editNote.value;
            this.note.patchValue(editNoteVals);
            this.note.markAsDirty();
        }
    }

    createEditNote(): void {
        const noteValues = this.note.value;
        const editControls = {};

        for (const control of Object.keys(this.note.controls)) {
            editControls[control] = null;
        }

        this.editNote = this._fb.group(editControls);
        this.editNote.patchValue(noteValues);
    }

    delete(): void {
        // confirm the user wishes to delete the item.
        if (confirm(`Are you sure you wish to remove this note from ${this.field.title}`)) {
            // add disabled classes.
            const note = $(`app-existing-note[data-note='${this.field.id}-${this.index}']`);
            $(note).addClass('disabled');

            // add key to form group to signify marked to delete.
            this.note.patchValue({deleted: true});

            // mark log entry as dirty so changes can be saved.
            this.note.markAsDirty();
        }
    }
}
