import { Component, Input, OnInit } from '@angular/core';
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

    ancestor;
    parent;
    primary;
    children;

    apiRoute: string;
    activeSection: string;
    newObject: {};
    objectTitle: string;
    includeType = false;

    constructor(private _setupService: SetupService) {}

    ngOnInit(): void {
        let data = this.data.response.data;

        this.ancestor = data.ancestor;
        this.parent   = data.parent;
        this.primary  = data.primary;
        this.children = data.children; 
        
        this.apiRoute      = this.data.apiRoute;
        this.activeSection = this.data.activeSection;

        this.initiateNewObject();
    }

    initiateNewObject(): void {
        if (this.activeSection === 'categories') {
            this.objectTitle = 'Category';
            this.newObject  = new newObject('Shop');
        }
        else if (this.activeSection === 'fields') {
            this.objectTitle = 'Field';
            this.includeType = true;
            this.newObject  = new newObject('Shop', undefined, this.primary.id, undefined, null);
        }
        else if (this.activeSection === 'field-columns') {
            this.objectTitle = 'Column';
            this.includeType = true;
            this.newObject  = new newObject(undefined, undefined, undefined, this.primary.id, null);
        }
        else if (this.activeSection === 'field-options' || this.activeSection === 'column-options') {
            this.objectTitle = 'Option';
            let source_class = (this.activeSection === 'field-options' ? 'CustomField' : 'CustomFieldLogColumn');
            this.newObject  = new newObject(source_class, this.primary.id);
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
            onDeny    : () => {
                return true;
            },
            onApprove : () => {
                return this.save(this.newObject);
            }
        })
        .modal('show');
    }

    save(obj): void {
        this._setupService.save(obj, {route: this.apiRoute})
        .subscribe(
            res => this.onSaveComplete(res),
            // (error: any) => this.errorMessage = <any>error
        )
    }

    onSaveComplete(res: any): boolean {
        this.initiateNewObject();
        return true;
    }
}