import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from './user.service';
import { ICurrentUser } from './currentUser';

declare let $ : any;

@Component({
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    private sub: Subscription;
    message: {};
    userList: ICurrentUser[];
    userProfiles = [
        {value:'admin', title:'Admin'},
        {value:'employee', title:'Employee'}
    ];

    constructor(private _userService: UserService, private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.userList = data.response.data;
        });
    }

    ngAfterViewInit(): void {
        $('.checkbox').checkbox();
        $('.dropdown').dropdown();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    flashMessage(message): void {
        $('.message').removeClass("success negative").addClass(message.status);
        this.message = message;

        $('.message')
            .transition('fade', 1000)
            .transition('fade', 1000);
    }

    onSaveComplete(response: any): void {
        // display success message.
        this.flashMessage({text: response.message, status: 'success'});
    }

    save(user): void {
        this._userService.save(user, 'manage')
            .subscribe(
                response => this.onSaveComplete(response),
                (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
            );
    }
}