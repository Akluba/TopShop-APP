import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from './user.service';
import { ICurrentUser } from './currentUser';

declare let $ : any;

class User {
    id: number = 0;
    active: boolean = true;
    name: string = null;
    email: string = null;
    profile: string = null;
}

@Component({
    styles: [`
        #users-header { padding: 0px; }
        .inline.fields > .field { padding: 0px .5em; }
        .ui.form .inline.fields .field>.selection.dropdown { width: 100%;}
    `],
    templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
    private sub: Subscription;
    message: {};
    userList: ICurrentUser[];
    newUser: ICurrentUser;
    userProfiles = ['admin','employee'];

    constructor(private _userService: UserService, private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this.sub = this._route.data.subscribe(data => {
            this.userList = data.response.data;
        });

        this.newUser = new User();
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
            .transition('fade', 2000);
    }

    save(user, userForm): void {
        let body = Object.assign({}, user, userForm.value);

        if (userForm.control.dirty && userForm.control.valid) {
            this._userService.save(body, 'manage')
                .subscribe(
                    response => {
                        if (body.id === 0) {
                            this.newUser = new User();
                            $('.new.user.dropdown').dropdown('clear');
                            setTimeout(() => {
                                $('.checkbox').checkbox();
                                $('.dropdown').dropdown();
                            }, 0);
                        }

                        userForm.control.markAsPristine();

                        this.flashMessage({text: response.message, status: 'success'})
                    },
                    (error: any) => this.flashMessage({text: <any>error, status: 'negative'})
                );
        }

    }
}