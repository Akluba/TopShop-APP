import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NoteFeedTemplate } from './note-feed.component';
import { LoggingFieldTemplate } from './logging-field.component';
import { FieldControlTemplate } from './field-control.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        NoteFeedTemplate,
        LoggingFieldTemplate,
        FieldControlTemplate
    ],
    exports: [
        CommonModule,
        NoteFeedTemplate,
        LoggingFieldTemplate,
        FieldControlTemplate
    ]
})
export class SharedModule {}
