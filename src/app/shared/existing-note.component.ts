import { Component, Input } from '@angular/core';

declare let $: any;

@Component({
    selector: 'app-existing-note',
    templateUrl: './existing-note.component.html',
    styles: [
        `
            .content > #meta_tags.meta { margin: .8em 0 0 }
        `
    ],
})
export class ExistingNoteComponent {
    @Input() note;
    @Input() index;
    @Input() field;

    editting = false;

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

    edit(): void {
        this.editting = this.editting ? false : true;
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
