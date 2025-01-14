import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-isd-profile',
  templateUrl: './isd-profile.component.html'
})
export class ISDProfileComponent implements OnInit {
  @Input() sourceClass: string;
  @Input() formValues: {};
  @Input() formElements: any[];

  ngOnInit(): void {}

}
