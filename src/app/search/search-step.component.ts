import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-adv-search-step',
    template:
`
<i [ngClass]="icon"></i>
<i *ngIf="loading"><div class="ui active loader"></div></i>

<div class="content">
    <div class="title">{{ title }}</div>
    <div class="description">{{ description }}</div>
</div>
`
})
export class AdvSearchStepComponent {
    @Input() loading: boolean;
    @Input() icon: string;
    @Input() title: string;
    @Input() description: string;
}
