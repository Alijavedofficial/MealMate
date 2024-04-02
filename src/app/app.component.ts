import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('showLogo', [
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.5)'
      })),
      transition('visible => hidden', [
        animate('1s')
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'mealmate';

  showLogo: boolean = true;

  ngOnInit() {
    // Hide the logo after 2 seconds
    setTimeout(() => {
      this.showLogo = false;
    }, 2000);
  }
}
