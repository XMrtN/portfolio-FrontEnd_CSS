import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience.model';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  
  experience: Experience[] = [];
  id?: number;
  exp: Experience = {
    id: 0,
    expCompName: '',
    expJobTitle: '',
    expPeriod: '',
    expDesc: ''
  };

  constructor(
    private experienceService: ExperienceService,
    protected tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loadExp();
  }

  loadExp(): void {
    this.experienceService.list().subscribe(data => {
      this.experience = data;
    });
  }

  onDetail(): void {
    this.experienceService.detail(this.id!).subscribe(data => {
      this.exp = data;
    }, err => {
      alert("No se pudieron cargar los datos");
    });
  }

  delete(id: number): void {
    if(id != undefined) {
      this.experienceService.delete(id).subscribe(data => {
        this.loadExp();
      }, err => {
        alert("No se pudo eliminar");
      });
    }
  }

}
