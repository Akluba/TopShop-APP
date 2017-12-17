import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoteFeedTemplate } from './note-feed.component';
import { LoggingFieldTemplate } from './logging-field.component';
import { FieldControlTemplate } from './field-control.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        NoteFeedTemplate,
        LoggingFieldTemplate,
        FieldControlTemplate
    ],
    exports: [
        CommonModule,
        FormsModule,
        NoteFeedTemplate,
        LoggingFieldTemplate,
        FieldControlTemplate
    ]
})
export class SharedModule {};