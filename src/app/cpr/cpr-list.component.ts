import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CPRService } from './cpr.service';

class CPR {
    id = 0;
    name: string = null;
}

@Component({
    templateUrl: './cpr-list.component.html'
})
export class CPRListComponent implements OnInit, OnDestroy {
    newCPR: CPR;
    private sub: Subscription;
    constructor(public cprService: CPRService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.sub = this.route.data.subscribe(data => {

        });

        this.newCPR = new CPR();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    save(): void {
        if (this.newCPR['name']) {
            this.cprService.save(this.newCPR)
                .subscribe(
                    () => this.newCPR = new CPR()
                );
        }
    }
}
