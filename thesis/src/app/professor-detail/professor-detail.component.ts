import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProfessorsService } from '../professors.service';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.component.html',
  styleUrls: ['./professor-detail.component.css']
})
export class ProfessorDetailComponent implements OnInit {

  public semester_list = null;
  public courses_list = null;
  public errorMsg = '';

  public professorId = 0;

  public selectedAcadYear = null;
  public selectedAcadYearName = null;

  public selectedCourseTitle = null;
  public selectedCourseTeachHours = null;
  public selectedCourseType = null;

  constructor(private route: ActivatedRoute, private _professorsService: ProfessorsService, private router: Router ) { }

  ngOnInit(): void {
    // let id = parseInt(this.route.snapshot.paramMap.get('id'));
    // this.professorId = id;

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.professorId = id;
    });

    this._professorsService.getProfessorById(this.professorId)
      .subscribe(data => this.semester_list = Object.entries(data)[10][1],
                  error => this.errorMsg = error);

    this._professorsService.getProfessorById(this.professorId)
      .subscribe(data => this.courses_list = Object.entries(data)[11][1],
                  error => this.errorMsg = error);
  }

  onSelectAcademyYear(event){
    this.selectedAcadYear = event.target.value;
    this.selectedAcadYearName = event.target.textContent;
  }

  goPrevious(){
    let previousId = this.professorId - 1;
    this.router.navigate(['/professor', previousId]);
  }

  goNext(){
    let nextId = this.professorId + 1;
    this.router.navigate(['/professor', nextId]);
  }

  onSelectedCourse(course){
    console.log(course)
    this.selectedCourseTitle = course.desc;
    this.selectedCourseType = course.course_type;
    this.selectedCourseTeachHours = course.teach_hours
  }

  goToProfessors(){
    let selectedId = this.professorId ? this.professorId : null;
  }

}
