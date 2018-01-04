import { Component } from '@angular/core';

@Component({
    template:
`
<div class="ui warning icon message">
    <i class="search icon"></i>
    <div class="content">
        <div class="header">
            Page Not Found.
        </div>
        <p>Sorry, the page you are looking for doesn't exist.</p>
    </div>
</div>
`
})
export class PageNotFoundComponent {}
