import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SetupService } from './setup.service';

declare let $ : any;

class newObject {
    id            : number = 0;
    title         : string = null;
    source_class? : string;
    source_id?    : number;
    category_id?  : number;
    field_id?     : number;
    type?         : string;

    constructor(source_class?, source_id?, category_id?, field_id?, type?) {
        this.source_class = source_class;
        this.source_id    = source_id;
        this.category_id  = category_id;
        this.field_id     = field_id;
        this.type         = type;
    }
}

@Component({
    selector: 'setup-create',
    templateUrl: 'create.component.html'
})
export class CreateComponent implements OnInit{
    @Input() data;

    sourceClass: string;
    categoryId: number;
    fieldId: number;
    columnId: number;

    apiRoute: string;
    newObject: newObject;
    objectTitle: string;
    primaryTitle: string;
    primaryType: string;
    includeType = false;

    constructor(private _route: ActivatedRoute, private _setupService: SetupService) {}

    ngOnInit(): void {
        let data = this.data.response.data;

        if (data.primary !== null){
            this.primaryTitle = data.primary.title;
            this.primaryType = data.primary.type;
        }

        console.log(this.primaryTitle);

        this.apiRoute = this.data.apiRoute;
        if (this.apiRoute == undefined) {
            this.apiRoute = ($.inArray(this.primaryType, ['log','notes']) != -1) ? 'column' : 'option';
        }

        this._route.params.subscribe(params => {
            this.sourceClass = params.source_class;
            this.categoryId = params.category_id;
            this.fieldId = params.field_id;
            this.columnId = params.column_id;

            this.initiateNewObject();
        });

    }

    initiateNewObject(): void {
        if (this.apiRoute === 'category') {
            this.objectTitle = 'Category';
            this.newObject = new newObject(this.sourceClass);
        }
        else if (this.apiRoute === 'field') {
            this.objectTitle = 'Field';
            this.includeType = true;
            this.newObject = new newObject(this.sourceClass, undefined, this.categoryId, undefined, null);
        }
        else if (this.apiRoute === 'option') {
            this.objectTitle = 'Option';
            let source_class = ( this.columnId ? 'CustomFieldLogColumn' : 'CustomField' );
            let source_id = ( this.columnId ? this.columnId : this.fieldId );

            this.newObject = new newObject(source_class, source_id);
        }
        else if (this.apiRoute === 'column') {
            this.objectTitle = 'Column';
            this.includeType = true;
            this.newObject = new newObject(undefined, undefined, undefined, this.fieldId, null);
        }

    }

    initiateModal(): void {
        // temp-fix: check to see if a create modal already exists.
        // if so, remove the previous element.
        if ($('.setup-create').length > 1) {
            $('.setup-create').slice(1).remove();
        }

        // modal settings
        $('.setup-create')
        .modal({
            closable  : false,
            onApprove : () => {
                this.save();
                return false;
            }
        })
        .modal('show');
    }

    save(): void {
        this._setupService.save(this.newObject, this.apiRoute)
        .subscribe(
            res => console.log(res),
            (error: any) => console.log(<any>error),
            () => {
                $('.setup-create').modal('hide');
                this.initiateNewObject();
            }
        );
    }

}