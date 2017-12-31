import { Component } from '@angular/core';

@Component({
    template:
`
<div class="ui error icon message">
    <i class="remove user icon"></i>
    <div class="content">
        <div class="header">
            Access to the requested page has been denied.
        </div>
        <p>Your profile is unauthorized to access this page.</p>
    </div>
</div>
`
})
export class UnauthorizedComponent {}