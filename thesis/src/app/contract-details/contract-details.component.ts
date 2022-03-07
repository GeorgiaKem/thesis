import { Component, OnInit } from '@angular/core';
import { ProfessorsService } from '../professors.service';
import { ContractService } from '../contract.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from '../contract';
import { NgForm } from '@angular/forms';
import {
  DatePipe
} from '@angular/common';


@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css'],
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]

})

export class ContractDetailsComponent implements OnInit {
  public fileName = '';


  public contract_list = null;
  public professorId = 0;
  public errorMsg = '';

  public currentContract = null;

  public new_contract_tab = null;
  public details_tab = true;
  public contractModel = null;
  public formState = 'newContract';
  public contractId = null;
  public editResponse = null;



  constructor(private _contractService: ContractService, private _professorsService: ProfessorsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.professorId = id;

    });


    this._professorsService.getProfessorById(this.professorId)
      .subscribe(data => this.contract_list = Object.entries(data)[12][1],
        error => this.errorMsg = error);

    this.contractModel = new Contract(this.professorId, null, null, null, null, null);
  }

  onDelete(id) {

  }

  resetForm(form: NgForm) {
    form.reset();
    this.contractModel = new Contract(this.professorId, null, null, null, null, null);
    this.formState = 'newContract'
  }


  onSelected(id, edit = null) {



    if (edit) {

      this.new_contract_tab = true;
      this.details_tab = null;

      this.contractId = id;
      this._contractService.getContractById(id)
        .subscribe(data => this.contractModel = new Contract(data['prof_id'], data['title'], data['description'], data['starts_at'], data['ends_at'], data['path']),
          error => this.errorMsg = error);

      console.log('on load', this.contractModel)

      this.contractModel.starts_at = new Date(this.contractModel.starts_at)
      this.contractModel.ends_at = new Date(this.contractModel.ends_at)


      // let start = (this.contractModel.starts_at != null) ? this.contractModel.starts_at : null;
      // let end = (this.contractModel.ends_at != null) ? this.contractModel.ends_at : null;

      //console.log(end)

      // if (start != null) {

      //   this.starts_at = new NgbDate(parseInt(start.split('-')[0]), parseInt(start.split('-')[1]), parseInt(start.split('-')[2]));
      //   console.log(this.starts_at)
      //   this.ends_at = new NgbDate(parseInt(end.split('-')[0]), parseInt(end.split('-')[1]), parseInt(end.split('-')[2]));
      //   console.log(this.ends_at)
      // }

      // this.onDateSelection(this.starts_at);

      // this.isHovered(this.starts_at);

      // this.isInside(this.starts_at);

      // this.isRange(this.starts_at);

      this.formState = 'editContract';

      console.log('edit contract')
      console.log('loaded data:', this.contractModel)


    } else {
      this.new_contract_tab = null;
      this.details_tab = true;

      this._contractService.getContractById(id)
        .subscribe(data => this.currentContract = data,
          error => this.errorMsg = error);

      this.formState = 'newContract';
    }

  }

  selectedTab(tab) {
    if (tab == 'details') {
      this.new_contract_tab = null;
      this.details_tab = true;
    } else {
      this.new_contract_tab = true;
      this.details_tab = null;
    }
  }

  //find and update contract list from response
  updateContractList(data) {
    this.contract_list.forEach(function (value) {
      if (data['id'] == value.id) {
        value.title = data['title'];
        value.description = data['description'];
        value.status = data['status'];
        value.starts_at = new Date(data['starts_at']);
        value.ends_at = new Date(data['ends_at']);
        value.path = data['path'];
      }
    });
  }

  download(contract) {
    console.log(this._contractService.downloadFile(contract));
  }

  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("fileImage", file);
      console.log(formData)
      this.contractModel.path = formData;

      const reader = new FileReader();
      reader.onload = e => {
        return this.contractModel.path = reader.result;
      };

      reader.readAsDataURL(file);

    }
  }


  onSubmit(form: NgForm) {

    if (this.formState == 'newContract') {

      this._contractService.createContract(this.contractModel)
        .subscribe(
          data => this.contract_list.push(data),
          error => console.log('Error!', error)
        )


    } else if (this.formState == 'editContract') {
      console.log('from edit', this.contractModel.starts_at)
      this.contractModel.starts_at = new Date(this.contractModel.starts_at)
      this.contractModel.ends_at = new Date(this.contractModel.ends_at)
      this._contractService.editContract(this.contractModel, this.contractId)
        .subscribe(
          data => this.updateContractList(data),
          error => console.log('Error!', error)
        )

      console.log('response data', this.editResponse)
    }
    form.resetForm();
    this.contractModel = new Contract(this.professorId, null, null, null, null, null);
    this.formState = 'newContract'
    this.new_contract_tab = null;
    this.details_tab = true;



  }



}
