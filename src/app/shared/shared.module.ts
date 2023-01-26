import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DxDataGridModule } from 'devextreme-angular';
import {
    DxListModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxTemplateModule,
    DxMultiViewModule,
    DxToastModule,
    DxButtonModule,
    DxPopupModule,
    DxFormModule,
} from 'devextreme-angular';

import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';

import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileShopsComponent } from './components/profile-shops/profile-shops.component';

import { DataListComponent } from './components/data-list/data-list.component';
import { ListDataTableComponent } from './ListDataTable/data-table.component';

import { DetailsFormComponent } from './DetailsForm/details-form.component';
import { NoteFeedTemplate } from './DetailsForm/note-feed.component';
import { ExistingNoteComponent } from './DetailsForm/existing-note.component';

import { LoggingFieldTemplate } from './FormFields/logging-field.component';
import { FieldControlTemplate } from './FormFields/field-control.component';

import { SortOrderPipe, SortABCPipe } from './order-by.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        TableModule,
        MultiSelectModule,
        RouterModule,
        DxDataGridModule,
        DxListModule,
        DxToolbarModule,
        DxSelectBoxModule,
        DxTemplateModule,
        DxMultiViewModule,
        DxToastModule,
        DxButtonModule,
        DxPopupModule,
        DxFormModule
    ],
    declarations: [
        DetailsFormComponent,
        NoteFeedTemplate,
        ExistingNoteComponent,
        LoggingFieldTemplate,
        FieldControlTemplate,
        DataListComponent,
        ListDataTableComponent,
        SortOrderPipe,
        SortABCPipe,
        ProfileHeaderComponent,
        ProfileShopsComponent
    ],
    exports: [
        CommonModule,
        DetailsFormComponent,
        LoggingFieldTemplate,
        FieldControlTemplate,
        DataListComponent,
        ListDataTableComponent,
        SortOrderPipe,
        SortABCPipe,
        ProfileHeaderComponent,
        ProfileShopsComponent
    ]
})
export class SharedModule {}
