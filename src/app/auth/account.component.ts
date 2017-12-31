import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

import { ICurrentUser } from './currentUser';

import { AuthService } from '../core/auth.service';
import { UserService } from './user.service';

declare let $ : any;

function passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
    let newPWControl = c.get('newPW');
    let confirmPWControl = c.get('confirmPW');

    if (newPWControl.pristine || confirmPWControl.pristine) {
        return null;
    }

    if(newPWControl.value === confirmPWControl.value) {
        return null;
    }
    return { 'match': true };
}

@Component({
    templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit{
    currentUser: ICurrentUser;
    userForm: FormGroup;
    passwordMessage: string;
    message: {};

    constructor(private _authService: AuthService, private _userService: UserService, private _fb: FormBuilder ) {}

    ngOnInit(): void {
        this.currentUser = this._authService.currentUser;

        this.userForm = this._fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            pwGroup: this._fb.group({
                password: '',
                newPW: '',
                confirmPW: ''
            }, {validator: passwordMatcher })
        });

        if (this.currentUser) {
            this.populateUserData();
        }
    }

    populateUserData(): void {
        this.userForm.patchValue({
            name: this.currentUser.name,
            email: this.currentUser.email
        });
    }

    pwResetControls(control): void {
        const pwControl = this.userForm.get('pwGroup.password');
        const newPWControl = this.userForm.get('pwGroup.newPW');
        const confirmPWControl = this.userForm.get('pwGroup.confirmPW');

        if (control.value && control.validator === null) {
            this.pwValidators('set');
        }
        else if (!pwControl.value && !newPWControl.value && !confirmPWControl.value ) {
            this.pwValidators('clear');
            this.userForm.get('pwGroup').markAsPristine();
        }
    }

    pwValidators(method): void {
        let pwGroup = this.userForm.get('pwGroup').value;
        for (let controlTitle in pwGroup) {
            let control = this.userForm.get(`pwGroup.${controlTitle}`);
            if (method === 'set') {
                control.setValidators(Validators.required);
            } else {
                control.clearValidators();
            }

            control.updateValueAndValidity();
        }
    }

    flashMessage(message): void {
        $('.message').removeClass("success negative");
        $('.message').addClass(message.status);

        this.message = message;

        $('.message')
        .transition('fade', 1000)
        .transition('fade', 1000);
    }

    onSaveComplete(response: any): void {
        // display success message.
        this.flashMessage({text: response.message, status: 'success'});

        this.pwValidators('clear');
        this.userForm.get('pwGroup').reset();
        this.userForm.markAsPristine();
    }

    save(): void {
        if (this.userForm.dirty && this.userForm.valid) {
            let body = Object.assign({}, this.currentUser, this.userForm.value);

            this._userService.save(body)
            .subscribe(
                response => this.onSaveComplete(response),
                (error: any) => this.flashMessage({text: <any>error, status: 'negative'}),
                () => this._authService.getCurrentUser().subscribe()
            );
        }
    }
}