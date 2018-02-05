import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CalendarModule } from 'primeng/primeng';

import { NoteFeedTemplate } from './note-feed.component';
import { ExistingNoteComponent } from './existing-note.component';
import { LoggingFieldTemplate } from './logging-field.component';
import { FieldControlTemplate } from './field-control.component';
import { SortOrderPipe } from './order-by.pipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CalendarModule,
        RouterModule
    ],
    declarations: [
        NoteFeedTemplate,
        ExistingNoteComponent,
        LoggingFieldTemplate,
        FieldControlTemplate,
        SortOrderPipe
    ],
    exports: [
        CommonModule,
        NoteFeedTemplate,
        LoggingFieldTemplate,
        FieldControlTemplate,
        SortOrderPipe
    ]
})
export class SharedModule {}
