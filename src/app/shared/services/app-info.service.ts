import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() {}

  public get title() {
    return '<img style="max-height:50px;" src="./assets/images/tsm_logo.png" />';
  }

  public get currentYear() {
    return new Date().getFullYear();
  }
}
