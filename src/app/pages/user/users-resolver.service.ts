import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable()
export class UsersResolver implements Resolve<any> {
    constructor(private _userService: UserService) {}

    resolve(): Observable<any> {
        return this._userService.index();
    }
}
