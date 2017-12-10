import { Component, Input } from '@angular/core';

declare let $ : any;

@Component({
    selector: 'shop-logging-field',
    template: 
`
<div class="ui raised secondary segment">
    <h4 class="header">{{ field.title }}</h4>
    <table class="ui very basic celled table">
        <thead>
            <tr>
                <th class="one wide"></th>
                <th *ngFor="let column of field.columns">{{ column.title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let log_entry of logEntries.controls; let i=index"
                attr.data-logentry="{{ field.id}}-{{i}}">
                <td><i class="red large minus link icon" *ngIf="i!==0"
                    (click)="deleteLogEntry(i, log_entry)"></i></td> 
                <td *ngFor="let column of field.columns"> 
                    <shop-field-control
                        [formGroup]="log_entry"
                        [control]="column">
                    </shop-field-control>    
                </td>
            </tr>
        </tbody>
    </table>
</div>
`
})
export class ShopLoggingField {
    @Input() field;
    @Input() logEntries;

    deleteLogEntry(i, log_entry): void {
        // confirm the user wishes to delete the item.
        if(confirm(`Are you sure you wish to remove this entry from ${this.field.title}`)) {
            // add classes to tr.
            $(`tr[data-logentry='${this.field.id}-${i}']`).addClass('error disabled');

            // add key to form group to signify marked to delete.
            log_entry.patchValue({deleted: true});
            
            // mark log entry as dirty so changes can be saved.
            log_entry.markAsDirty();
        }
    }
}