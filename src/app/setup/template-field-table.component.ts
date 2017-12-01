import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { SetupService } from './setup.service';

declare var $ :any;

@Component({
    selector: 'setup-field-table',
    templateUrl: 'template-field-table.component.html'
})
export class FieldTableComponent {
    @Input() data;

    ancestor;
    parent;
    primary;
    children;
    apiRoute: string;
    activeSection: string;
    navigateText: string;
    message: {};

    constructor(private _route: ActivatedRoute, private _setupService: SetupService, private _router: Router) {}

    ngOnInit(): void {
        let data = this.data.response.data;

        this.ancestor = data.ancestor;
        this.parent   = data.parent;
        this.primary  = data.primary;
        this.children = data.children;

        this.apiRoute      = this.data.apiRoute;
        this.activeSection = this.data.activeSection;

        this.navigateText = (this.activeSection === 'categories' ? 'Edit Fields' : 'Edit Field');
    }

    delete(child): void {
        if(confirm(`Are you sure you want to delete the ${this.apiRoute}: ${child.title}?`)) {
            this._setupService.destroy(child.id, {route: this.apiRoute})
                .subscribe(
                    res => this.onSaveComplete(res),
                    (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
                );
        }
    }

    save(child): void {
        this._setupService.save(child, {route: this.apiRoute})
        .subscribe(
            res => this.onSaveComplete(res),
            (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
        )
    }

    onSaveComplete(res: any): void {
        this.flashMessage({text: res.message, status: 'success'});
    }

    flashMessage(message): void {
        $('.message').addClass(message.status);
        
        this.message = message;
        
        $('.message')
        .transition('fade up',1000)
        .transition('fade up',1000);
    }

    canNavigate(child_type): boolean {
        if (this.activeSection === 'categories' || this.activeSection === 'fields' || this.activeSection === 'field-columns') {
            if (this.activeSection != 'categories') {
                if (child_type != 'select' && child_type != 'select_multiple' && child_type != 'log') {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    navigateToChild(child): void {
        if (this.activeSection === 'categories') {
            this._router.navigate(['/setup', child.id]);
        }
        else if (this.activeSection === 'fields') {
            if (child.type === 'log') {
                this._router.navigate(['/setup', this.primary.id, child.id, 'columns']);
            } else {
                this._router.navigate(['/setup', this.primary.id, child.id, 'options']);
            }
        }
        else if (this.activeSection === 'field-columns') {
            this._router.navigate(['/setup', this.parent.id, this.primary.id, child.id, 'options']);
        }
    }
}