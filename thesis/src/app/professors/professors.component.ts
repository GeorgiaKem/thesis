import { Component, OnInit } from '@angular/core';
import { ProfessorsService } from '../professors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {

  public professors_list = Array();
  public errorMsg = '';
  //public professors_list: { id: string, name: string, age: number }[]

  constructor(private _professorsService: ProfessorsService , private router: Router) { }

  ngOnInit(): void {
    this._professorsService.getProfessors()
      .subscribe(data => this.professors_list = data,
                  error => this.errorMsg = error);
  }

  onSelectCourses(professor: { prof_id: any; }){
    this.router.navigate(['/professor', professor.prof_id]);
  }

  onSelectContract(professor: { prof_id: any;}){
    this.router.navigate(['/contracts', professor.prof_id])
  }



}
