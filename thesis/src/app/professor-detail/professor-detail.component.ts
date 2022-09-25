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
  public selectedType = null;
  public selectedHours = null;
  public selectedCourseTeachHours = null;
  public selectedCourseType = null;
  public is_monimos1 = true;
  public prof_name = null;

  public showDetails = false;
  public showCourseTable = false;
  public hasCourseThisAcademicYear = false;

  constructor(private route: ActivatedRoute, private _professorsService: ProfessorsService, private router: Router) { }

  ngOnInit(): void {
    // let id = parseInt(this.route.snapshot.paramMap.get('id'));
    // this.professorId = id;

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.professorId = id;
    });

    this._professorsService.getProfessorById(this.professorId)
      .subscribe(data => {

        if (Object.entries(data)[6][1]) {
          this.is_monimos1 = true
        } else {
          this.is_monimos1 = false
        }
        this.prof_name = Object.entries(data)[3][1]

        this.semester_list = Object.entries(data)[12][1]
        if (this.semester_list.length != 0) {
          this.selectedAcadYear = this.semester_list[this.semester_list.length - 1].sem_id;
          this.selectedAcadYearName = this.semester_list[this.semester_list.length - 1].semester;
        }

      },
        error => this.errorMsg = error);

    this._professorsService.getProfessorById(this.professorId)
      .subscribe(data => this.courses_list = Object.entries(data)[13][1],
        error => this.errorMsg = error);
  }


  changeType(event) {
    let state = event.offsetParent.parentElement['attributes'][2].value
    if (state == 'false') {
      state = false;
    } else {
      state = true;
    }
    this._professorsService.editType(this.professorId, state)
      .subscribe(
        error => this.errorMsg = error
      )

  }

  onSelectAcademyYear(event) {
    this.showDetails = false;
    this.selectedAcadYear = event.target.value;
    this.selectedAcadYearName = event.target.textContent;
    this.showCourseTable = true;

    this.hasCourseThisAcademicYear = false;
    this.courses_list.forEach(element => {

      if (this.selectedAcadYear == element.sem_id) {
        this.hasCourseThisAcademicYear = true;
      }

    });
  }

  goPrevious() {
    let previousId = this.professorId - 1;
    this.router.navigate(['/professor', previousId]);
  }

  goNext() {
    let nextId = this.professorId + 1;
    this.router.navigate(['/professor', nextId]);
  }

  onSelectedCourse(course) {
    this.selectedCourseTitle = course.desc;
    this.selectedCourseType = course.course_type;
    this.selectedCourseTeachHours = course.teach_hours

    this.showDetails = true;
  }

  goToProfessors() {
    let selectedId = this.professorId ? this.professorId : null;
  }

}
