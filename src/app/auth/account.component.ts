import { Component, OnInit } from '@angular/core';

import { ICurrentUser } from './currentUser';

import { AuthService } from '../core/auth.service';
import { UserService } from './user.service';

declare let $ : any;

@Component({
    templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit{
    currentUser: ICurrentUser;
    message: {};
    constructor(private _authService: AuthService, private _userService: UserService) {}

    ngOnInit(): void {
        this.currentUser = this._authService.currentUser;
    }

    flashMessage(message): void {
        $('.message').addClass(message.status);

        this.message = message;

        $('.message')
        .transition('fade', 1000)
        .transition('fade', 1000);
    }

    onSaveComplete(response: any): void {
        // display success message.
        this.flashMessage({text: response.message, status: 'success'});
    }

    save(currentUser): void {
        let body = Object.assign({}, this.currentUser, currentUser.value);
        console.log(body);

        this._userService.save(body)
            .subscribe(
                response => this.onSaveComplete(response),
                (error: any) => this.flashMessage({text: <any>error, status: 'negative'}),
                () => this._authService.getCurrentUser()
            );
    }
}