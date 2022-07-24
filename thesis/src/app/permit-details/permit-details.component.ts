import { Component, OnInit } from '@angular/core';
import { PermitService } from '../permit.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Permit } from '../permit';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { ProfessorsService } from '../professors.service';

@Component({
  selector: 'app-permit-details',
  templateUrl: './permit-details.component.html',
  styleUrls: ['./permit-details.component.css']
})

export class PermitDetailsComponent implements OnInit {


  public permit_list = null;
  public professorId = 0;
  public errorMsg = '';
  public permitId = null;
  public permitModel = null;
  public currentPermit = new Permit(this.professorId, null, null, null, null, null);
  public formState = 'newPermit';
  public editResponse = null;
  public new_permit_tab = null;
  public details_tab = true;

  public semester_list = null;
  public selectedAcadYear = null;
  public selectedAcadYearName = null;


  constructor(private _permitService: PermitService, private route: ActivatedRoute, private _professorsService: ProfessorsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.professorId = id;

    });

    this.permitModel = new Permit(this.professorId, null, null, null, null, null);

    this._professorsService.getProfessorById(this.professorId)
      .subscribe(data => this.permit_list = Object.entries(data)[15][1],
        error => this.errorMsg = error);

    console.log(this.permit_list)


    this._permitService.getSemesterList()
      .subscribe(data => {
        this.semester_list = data;
        if (this.semester_list.length != 0) {
          this.selectedAcadYear = this.semester_list[this.semester_list.length - 1].sem_id;
          this.selectedAcadYearName = this.semester_list[this.semester_list.length - 1].semester;
        }
      })


  }

  onSelectAcademyYear(event) {
    this.selectedAcadYear = event.target.value;
    this.selectedAcadYearName = event.target.textContent;
    console.log(this.selectedAcadYear)
  }

  onSelected(permit, edit = null) {

    if (edit) {
      this.formState = 'editPermit';
      this.new_permit_tab = true;
      this.details_tab = null;


      this.permitModel = permit
      this.permitModel.from = new Date(permit.from)
      this.permitModel.until = (permit.until != null) ? new Date(permit.until) : null;

    } else {

      this.new_permit_tab = null;
      this.details_tab = true;

      this.currentPermit.title = permit.title
      this.currentPermit.description = permit.description
      this.currentPermit.from = permit.from
      this.currentPermit.until = permit.until

      this.formState = 'newPermit';

    }

  }

  resetForm(form: NgForm) {
    form.reset();
    this.permitModel = new Permit(this.professorId, null, null, null, null, null);
    this.formState = 'newPermit'
  }

  updatePermitList(data) {
    this.permit_list.forEach(function (value) {
      if (data['id'] == value.id) {
        value.title = data['title'];
        value.description = data['description'];
        value.until = data['until'];
        value.from = data['from'];
      }
    });
  }

  onSubmit(form: NgForm) {
    console.log(this.permitModel)

    console.log('Is Form Invalid', this.permitModel);

    if (this.formState == 'newPermit') {
      this.permitModel = new Permit(this.professorId, this.selectedAcadYear, this.permitModel.title, this.permitModel.description, this.permitModel.from, this.permitModel.until);


      //this.permitModel.ends_at = this.ends_at
      //this.permitModel.starts_at = this.starts_at
      this._permitService.createPermit(this.permitModel)
        .subscribe(
          data => this.permit_list.push(data),
          error => console.log('Error!', error)
        )


    } else if (this.formState == 'editPermit') {
      console.log('ON EDIT')
      this.permitModel.from = new Date(this.permitModel.from)
      if (this.permitModel.until != null) {
        this.permitModel.until = new Date(this.permitModel.until)
      }

      this._permitService.editPermit(this.permitModel, this.permitModel.id)
        .subscribe(
          data => this.updatePermitList(data),
          error => console.log('Error!', error)
        )
    }
    //form.resetForm();
    this.permitModel = new Permit(this.professorId, this.selectedAcadYear, null, null, null, null);
    console.log(this.permitModel)
    this.formState = 'newPermit'
    this.new_permit_tab = null;
    this.details_tab = true;



  }

  selectedTab(tab) {
    if (tab == 'details') {
      this.new_permit_tab = null;
      this.details_tab = true;
    } else {
      this.new_permit_tab = true;
      this.details_tab = null;
    }
  }

}
