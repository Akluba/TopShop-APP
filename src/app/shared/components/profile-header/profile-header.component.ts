import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-profile-header',
    templateUrl: './profile-header.component.html'
  })
  export class ProfileHeaderComponent {
    @Input() details: HeaderDetails;
  }


  class HeaderDetails {
    name: string;
    created: string;
    updated_at: string;
  }