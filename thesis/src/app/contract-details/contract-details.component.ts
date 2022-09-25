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
import * as fileSaver from 'file-saver';

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

  public semester_list = null;
  public selectedAcadYear = null;
  public selectedAcadYearName = null;
  public profType = null;

  public showDetails = false;
  public noContracts = true;



  constructor(private _contractService: ContractService, private _professorsService: ProfessorsService, private route: ActivatedRoute) {
  }
  fetchDataByProf() {
    this._professorsService.getProfessorById(this.professorId)
      .subscribe(data => {
        this.contract_list = Object.entries(data)[14][1]
        this.profType = Object.entries(data)[6][1]

        let found = false;
        this.contract_list.forEach(element => {
          if (element.sem_id == this.selectedAcadYear) {
            found = true;
          }
        });

        if (found) {
          this.noContracts = false;
        } else {

          this.noContracts = true;
        }
      },
        error => this.errorMsg = error);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.professorId = id;

    });

    this._contractService.getSemesterList()
      .subscribe(data => {
        this.semester_list = data;
        if (this.semester_list.length != 0) {
          this.selectedAcadYear = this.semester_list[this.semester_list.length - 1].sem_id;
          this.selectedAcadYearName = this.semester_list[this.semester_list.length - 1].semester;

          this.fetchDataByProf()
        }
      })

    this.contractModel = new Contract(this.professorId, this.selectedAcadYear, null, null, null, null, null);




  }

  onSelectAcademyYear(event) {
    this.selectedAcadYear = event.target.value;
    this.selectedAcadYearName = event.target.textContent;


    this.showDetails = true;

    let found = false;

    this.contract_list.forEach(element => {
      if (event.target.value == element.sem_id) {
        found = true;
      }
    });

    if (!found) {
      this.noContracts = true;
    } else {
      this.noContracts = false;
    }
  }

  resetForm(form: NgForm) {
    form.reset();
    this.contractModel = new Contract(this.professorId, this.selectedAcadYear, null, null, null, null, null);
    this.formState = 'newContract'
  }


  onSelected(id, edit = null) {


    this.showDetails = true;
    if (edit) {

      this.new_contract_tab = true;
      this.details_tab = null;

      this.contractId = id;
      this._contractService.getContractById(id)
        .subscribe(data => this.contractModel = new Contract(data['prof_id'], data['sem_id'], data['title'], data['description'], data['starts_at'], data['ends_at'], data['path']),
          error => this.errorMsg = error);

      this.contractModel.starts_at = new Date(this.contractModel.starts_at)
      this.contractModel.ends_at = new Date(this.contractModel.ends_at)

      this.formState = 'editContract';


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

      // Load last contract
      let lastContract = this.contract_list[this.contract_list.length - 1];

      if (lastContract) {
        this.contractModel = new Contract(this.professorId, this.selectedAcadYear, lastContract.title, lastContract.description, lastContract.starts_at.split(' ')[0], lastContract.ends_at.split(' ')[0], null);
      }


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

  destroy(id) {

    var self = this

    this._contractService.delete(id).subscribe(data => {

    }, error => this.errorMsg = error);

    this.contract_list.forEach(function (value, index) {

      if (id == value.id) {

        delete self.contract_list[index];

      }
    });
  }


  download(contract) {
    var filename = contract.path
    filename = filename.substring(filename.lastIndexOf('/') + 1);
    this._contractService.downloadFile(contract)
      .subscribe((response: any) => {
        var data = new Blob([response], { type: 'text/plain;charset=utf-8' });
        fileSaver.saveAs(data, filename);
      }), (error: any) => console.log('Error downloading the file'), //when you use stricter type checking
      () => console.info('File downloaded successfully');
  }

  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("fileImage", file);
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

      this.contractModel.sem_id = this.selectedAcadYear
      this._contractService.createContract(this.contractModel)
        .subscribe(
          data => this.contract_list.push(data),
          error => console.log('Error!', error)
        )

      this.noContracts = false;

    } else if (this.formState == 'editContract') {
      this.contractModel.starts_at = new Date(this.contractModel.starts_at)
      this.contractModel.ends_at = new Date(this.contractModel.ends_at)
      this._contractService.editContract(this.contractModel, this.contractId)
        .subscribe(
          data => this.updateContractList(data),
          error => console.log('Error!', error)
        )

    }
    form.resetForm();
    this.contractModel = new Contract(this.professorId, this.selectedAcadYear, null, null, null, null, null);
    this.formState = 'newContract'
    this.new_contract_tab = null;
    this.details_tab = true;




  }



}
