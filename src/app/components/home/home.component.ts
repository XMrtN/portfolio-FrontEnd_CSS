import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  person: Person = null!;
  parallax = [
    { url: "../../../assets/img/bg/stars.png", alt: "stars" },
    { url: "../../../assets/img/bg/moon.png", alt: "moon" },
    { url: "../../../assets/img/bg/shadow.png", alt: "shadow" },
    { url: "../../../assets/img/bg/building.png", alt: "building" },
    { url: "../../../assets/img/bg/smoke.png", alt: "smoke" },
    { url: "../../../assets/img/bg/road.png", alt: "road" },
  ];
  id?: number;
  personEdit: Person = {
    id: 0,
    name: '',
    lastName: '',
    description: '',
    email: '',
    img: '',
    cv: ''
  };

  constructor(
    private personService: PersonService,
    protected tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loadPerson();
    this.initAnimations();

    document.querySelectorAll("img").forEach(img => {
      if (img.complete) {
        this.parallaxAnimations();
      } else {
        img.addEventListener("load", imgLoaded => this.parallaxAnimations());
      }
    });
  }

  loadPerson(): void {
    this.personService.detail(1).subscribe(data => {
      this.person = data;
    });
  }

  onDetail(): void {
    this.personService.detail(this.id!).subscribe(data => {
      this.personEdit = data;
    }, err => {
      alert("No se pudieron cargar los datos");
    });
  }

  initAnimations(): void {
    window.addEventListener("load", () => {
      gsap.to("h1.display-4, .p.mb-2, .imgBox, a.btn-primary", {
        duration: 1,
        x: 0,
        opacity: 1,
        stagger: 0.4,
        delay: 2.4,
      });
    });
  }

  parallaxAnimations(): void {
    const parallax = gsap.timeline()
      .fromTo(".stars", {x: -200}, {x: 200})
      .to(".moon", {y: 400}, "<")
      .to(".shadow", {y: 300}, "<")
      .to(".building", {y: 150}, "<")
      .to(".smoke", {y: 100}, "<");
    
    ScrollTrigger.create({
      animation: parallax,
      trigger: "#home",
      start: "top 0%",
      end: "bottom 0%",
      scrub: 1
    });
  }
  
}
