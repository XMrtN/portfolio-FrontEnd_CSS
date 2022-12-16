import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { AppComponent } from 'src/app/app.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(protected appComponent: AppComponent) { }
  
  ngOnInit(): void {
    this.initAnimations();
  }
  
  initAnimations(): void {
    window.addEventListener("load", () => {
      const tl = gsap.timeline({defaults: {duration: 1}})
      .from(".nav-logo img", {y: -200}, 1)
      .from(".navbar-toggler", {y: -200}, "<0.5")
      .from(".nav-link", {y: -200, stagger: 0.2}, "<0.5")
      .from(".btn-settings", {y: -200}, "<1.2");
    });
  }

}
