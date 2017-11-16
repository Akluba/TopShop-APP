import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';

import { CategoryListComponent } from './category-list.component';
import { FieldListComponent } from './field-list.component';

import { CategoryService } from './category.service';
import { FieldService } from './field.service';

import { FieldResolver } from './field-resolver.service';

@NgModule({
    imports: [ SharedModule, SetupRoutingModule ],
    declarations: [ CategoryListComponent, FieldListComponent ],
    providers: [ CategoryService, FieldService, FieldResolver ]
})
export class SetupModule {}