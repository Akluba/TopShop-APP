import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CalendarModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

import { ListDataTableComponent } from './ListDataTable/data-table.component';

import { DetailsFormComponent } from './DetailsForm/details-form.component';
import { NoteFeedTemplate } from './DetailsForm/note-feed.component';
import { ExistingNoteComponent } from './DetailsForm/existing-note.component';

import { LoggingFieldTemplate } from './FormFields/logging-field.component';
import { FieldControlTemplate } from './FormFields/field-control.component';

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
        ListDataTableComponent,
        SortOrderPipe
    ],
    exports: [
        CommonModule,
        DetailsFormComponent,
        LoggingFieldTemplate,
        ListDataTableComponent,
        SortOrderPipe
    ]
})
export class SharedModule {}
