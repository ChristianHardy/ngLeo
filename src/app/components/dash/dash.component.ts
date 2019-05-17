import { Component, OnInit, AfterViewInit } from '@angular/core';
declare let $4: any;

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit() { }

  ngAfterViewInit() {
    $('#menu-toggle').on('click', (e) => {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

}
