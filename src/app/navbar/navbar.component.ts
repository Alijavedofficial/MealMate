import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2  } from '@angular/core';
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
  isMenuOpen: boolean = false;
  
  constructor( private renderer:Renderer2) {}
  
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
 
openMenu() {
  this.isMenuOpen = true;

  this.renderer.addClass(document.body, 'overflow-hidden')
  
}

closeMenu() {
  this.isMenuOpen = false;
  // Close dropdown menus if they are open
  this.showDropdown = false;
  this.showDropdown2 = false;

  this.renderer.removeClass(document.body, 'overflow-hidden')
}

}
