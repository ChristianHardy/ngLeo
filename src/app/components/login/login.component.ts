import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.classList.add('bg-gradient--dark-blue-gray-middle-red-purple');
  }

  ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.classList.remove('bg-gradient--dark-blue-gray-middle-red-purple');
  }

}
