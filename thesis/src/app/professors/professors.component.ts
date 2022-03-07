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

  public displayedColumns = ['firstname', 'lastname', 'email', 'actions'];
  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  //public professors_list: { id: string, name: string, age: number }[]

  constructor(private _professorsService: ProfessorsService, private router: Router) { }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this._professorsService.getProfessors()

      .subscribe((res) => {
        console.log(res);
        this.dataSource.data = res;
      })
    //error => this.errorMsg = error);

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

