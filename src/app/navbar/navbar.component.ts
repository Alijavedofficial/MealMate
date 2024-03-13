import { Component, OnInit, ElementRef, ViewChild, AfterViewInit  } from '@angular/core';
import gsap from 'gsap';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit{
  @ViewChild('navbar') navbar?: ElementRef;
   showDropdown: boolean = false;
  showDropdown2: boolean = false;
  open: boolean = false
  constructor() {}
  
ngAfterViewInit(): void {
  this.animateNavbar()
}
animateNavbar():void {
  gsap.from(this.navbar?.nativeElement, {
    duration: 1.2,
    y: -50,
    opacity: 0,
    ease: 'power1.out'
  });

}
 
openMenu():void{
  this.open = true
}

}
