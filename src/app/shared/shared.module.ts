import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CalendarModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

import { DetailsFormComponent } from './details-form.component';
import { NoteFeedTemplate } from './note-feed.component';
import { ExistingNoteComponent } from './existing-note.component';
import { LoggingFieldTemplate } from './logging-field.component';
import { FieldControlTemplate } from './field-control.component';
import { DataTableComponent } from './ListDataTable/data-table.component';

import { SortOrderPipe } from './order-by.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        TableModule,
        MultiSelectModule,
        RouterModule
    ],
    declarations: [
        DetailsFormComponent,
        NoteFeedTemplate,
        ExistingNoteComponent,
        LoggingFieldTemplate,
        FieldControlTemplate,
        DataTableComponent,
        SortOrderPipe
    ],
    exports: [
        CommonModule,
        DetailsFormComponent,
        NoteFeedTemplate,
        LoggingFieldTemplate,
        FieldControlTemplate,
        DataTableComponent,
        SortOrderPipe
    ]
})
export class SharedModule {}
