import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  @Input() data: any[];
  @Input() key: string;
  @Input() test: string;

  ngOnInit(): void {
    console.log(this.test);
  }

}
