import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfessorsService } from '../professors.service';
import { Router } from '@angular/router';
import { IProfessor } from 'professor';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.css']
})
export class ProfessorsComponent implements OnInit {


  public professors_list = Array();
  public errorMsg = '';
  public responseDataMonimoi = [];
  public responseDataEktaktoi = [];

  public selectedAcadYear = null;
  public selectedAcadYearName = null;
  public semester_list = [];
  public sem_list = [];

  public displayedColumns = ['name', 'monimos', 'email', 'actions'];
  public dataSourceMonimoi = new MatTableDataSource();
  public dataSourceEktaktoi = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //public professors_list: { id: string, name: string, age: number }[]

  constructor(private _professorsService: ProfessorsService, private router: Router) { }

  ngOnInit(): void {

    this.dataSourceMonimoi.paginator = this.paginator;
    this.dataSourceEktaktoi.paginator = this.paginator;
    this._professorsService.getProfessors()

      .subscribe((res) => {
        res.forEach(item => {

          let sem = item.semesters
          sem.forEach(sem_item => {
            let sem_id = sem_item['sem_id']

            if (this.semester_list[sem_id] === undefined) {
              this.semester_list[sem_id] = sem_item['semester'];
            }
          })


        })

        this.semester_list.forEach((val, index) => {
          let arr = [];
          arr['sem_id'] = index;
          arr['sem'] = val;
          this.sem_list.push(arr);
        })

        this.selectedAcadYear = this.sem_list[this.sem_list.length - 1].sem_id;
        this.selectedAcadYearName = this.sem_list[this.sem_list.length - 1].sem;

        res.forEach(elem => {

          let sems = elem.semesters
          sems.forEach(elem1 => {

            if (elem1['sem_id'] == this.selectedAcadYear && elem.is_monimos == 1) {
              this.responseDataMonimoi.push(elem);
            } else if (elem1['sem_id'] == this.selectedAcadYear && elem.is_monimos == 0) {
              this.responseDataEktaktoi.push(elem);
            }

          })
        })
        this.dataSourceMonimoi.data = this.responseDataMonimoi;
        this.dataSourceEktaktoi.data = this.responseDataEktaktoi;


      })
    //error => this.errorMsg = error);

  }

  onSelectAcademyYear(event) {
    this.dataSourceMonimoi.data = [];
    this.dataSourceEktaktoi.data = [];

    this.responseDataMonimoi = [];
    this.responseDataEktaktoi = [];

    this.selectedAcadYear = event.target.value;
    this.selectedAcadYearName = event.target.textContent;

    this._professorsService.getProfessors()

      .subscribe((res) => {

        // this.selectedAcadYear = this.sem_list[this.sem_list.length - 1].sem_id;
        // this.selectedAcadYearName = this.sem_list[this.sem_list.length - 1].sem;

        res.forEach(elem => {
          console.log(elem.is_monimos == 0)

          let sems = elem.semesters
          sems.forEach(elem1 => {
            if (elem1['sem_id'] == this.selectedAcadYear && elem.is_monimos == 1) {
              this.responseDataMonimoi.push(elem)
            } else if (elem1['sem_id'] == this.selectedAcadYear && elem.is_monimos == 0) {
              this.responseDataEktaktoi.push(elem)
            }
          })
        })
        this.dataSourceMonimoi.data = this.responseDataMonimoi;
        this.dataSourceEktaktoi.data = this.responseDataEktaktoi;


      })
  }

  public doFilter = (value) => {
    value = value.value
    this.dataSourceMonimoi.filter = value.trim().toLocaleLowerCase();
    this.dataSourceEktaktoi.filter = value.trim().toLocaleLowerCase();
  }

  onSelectCourses(professor: { prof_id: any; }) {
    this.router.navigate(['/professor', professor.prof_id]);
  }

  onSelectContract(professor: { prof_id: any; }) {
    this.router.navigate(['/contracts', professor.prof_id])
  }

  onSelectPermits(professor: { prof_id: any; }) {
    this.router.navigate(['/permits', professor.prof_id])
  }



}

