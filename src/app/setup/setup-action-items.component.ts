import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { SetupService } from './setup.service';

@Component({
    selector: 'setup-action-items',
    templateUrl: 'setup-action-items.component.html'
})
export class ActionItemsComponent {
    @Input() data;

    ancestor;
    parent;
    primary;
    children;
    apiRoute: string;
    activeSection: string;
    natigateText: string;

    constructor(private _route: ActivatedRoute,private _setupService: SetupService, private _router: Router) {}

    ngOnInit(): void {
        let data = this.data.response.data;

        this.ancestor = data.ancestor;
        this.parent   = data.parent;
        this.primary  = data.primary;
        this.children = data.children;

        this.activeSection = this.data.activeSection;
        this.apiRoute      = this.data.apiRoute;

        this.configNavigation();
    }

    configNavigation() {
        if (this.activeSection === 'categories') {
            this.natigateText = 'Edit Fields'; 
        } 
        else {
            this.natigateText = 'Edit Field';
        }
    }

    canNavigate(child_type): boolean {
        // this.activeSection === 'categories'
        // this.activeSection === 'fields' && (child_type === 'select' || child_type === 'select_multiple' || child_type === 'log')
        // this.activeSection === 'field-columns' && (child_type === 'select' || child_type === 'select_multiple')

        return true;

    }

    navigateToChild(child_id): void {
        if (!this.primary) {
            this._router.navigate(['/setup', child_id]);
        } else if (this.primary && !this.parent) {
            this._router.navigate(['/setup', this.primary.id, child_id]);
        } else if (this.parent) {
            this._router.navigate(['/setup', this.parent.id, this.primary.id, child_id, 'options']);
        }
       
        // [routerLink]="['/setup', category.id]"
        // [routerLink]="['/setup', category.id, field.id]"
        // [routerLink]="['/setup', category.id, field.id, column.id, 'options']"
    }

    delete(child): void {
        if(confirm(`Are you sure you want to delete the ${this.apiRoute}: ${child.title}?`)) {
            this._setupService.destroy(child.id, {route: this.apiRoute})
                .subscribe(
                    res => this.onSaveComplete(res),
                    //(error: any) => this.errorMessage = <any>error
                );
        }
    }

    save(child): void {
        this._setupService.save(child, {route: this.apiRoute})
        .subscribe(
            res => this.onSaveComplete(res),
            // (error: any) => this.errorMessage = <any>error
        )
    }

    onSaveComplete(res: any): void {
        if (res.method === 'create') {
            this.children.push(res.data);
        }
        else if (res.method === 'delete') {
            this.children = this.children.filter(obj => obj.id != res.data.id);
        }
        
        //this.successMessage = column.message;
    }
}