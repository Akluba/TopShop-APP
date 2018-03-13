import { Component, Input } from '@angular/core';

declare let $: any;

@Component({
    selector: 'logging-field',
    template:
`
<div class="ui raised secondary segment">
    <h4 class="header">{{ field.title }}</h4>
    <table class="ui very basic celled table">
        <thead>
            <tr>
                <th class="one wide"></th>
                <th *ngFor="let column of field.columns | sortOrder">{{ column.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let log_entry of logEntries.controls; let i=index"
                attr.data-logentry="{{ field.id }}-{{i}}">
                <td>
                    <ng-container *ngIf="i===0; else deleteIcon">
                        <i class="large blue undo link icon"
                            (click)="resetNewEntry()">
                        </i>
                    </ng-container>

                    <ng-template #deleteIcon>
                        <i class="red large minus link icon"
                            (click)="deleteLogEntry(i, log_entry)">
                        </i>
                    </ng-template>
                </td>
                <td *ngFor="let column of field.columns | sortOrder">
                    <field-control
                        [formGroup]="log_entry"
                        [control]="column">
                    </field-control>
                </td>
            </tr>
        </tbody>
    </table>
</div>
`
})
export class LoggingFieldTemplate {
    @Input() field;
    @Input() logEntries;

    resetNewEntry(): void {
        const newEntryControls = this.logEntries.controls[0].controls;

        // Hacky way of clearing dropdowns when resetting log entry.
        const dropdowns = $(`tr[data-logentry='${this.field.id}-0']`).find('.ui.dropdown');

        if (dropdowns.length > 0) {
            dropdowns.dropdown('clear');
        }

        // Reset each control that is not pristine.
        for (const control of Object.keys(newEntryControls)) {
            if (!newEntryControls[control].pristine) {
                newEntryControls[control].reset();
            }
        }
    }

    deleteLogEntry(i, log_entry): void {
        // confirm the user wishes to delete the item.
        if (confirm(`Are you sure you wish to remove this entry from ${this.field.title}`)) {
            // add classes to tr.
            $(`tr[data-logentry='${this.field.id}-${i}']`).addClass('error disabled');

            // add key to form group to signify marked to delete.
            log_entry.patchValue({deleted: true});

            // mark log entry as dirty so changes can be saved.
            log_entry.markAsDirty();
        }
    }
}
