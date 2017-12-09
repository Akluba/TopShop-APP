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
            <tr *ngFor="let log_entry of logEntries.controls; let i=index">
                <td><i class="red large minus link icon" *ngIf="i!==0"
                    (click)="deleteLogEntry(log_entry)"></i></td> 
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

    deleteLogEntry(log_entry): void {
        console.log(log_entry);
    }
}