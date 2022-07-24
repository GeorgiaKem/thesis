import { Component, OnInit } from '@angular/core';
import { ProfessorsService } from '../professors.service';
import { ContractService } from '../contract.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Contract } from '../contract';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css'],
  styles: [`
    .form-group.hidden {
      width: 0;
      margin: 0;
      border: none;
      padding: 0;
    }
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

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

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



  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private _contractService: ContractService,private _professorsService: ProfessorsService,private route: ActivatedRoute) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.professorId = id;

    });


    this._professorsService.getProfessorById(this.professorId)
      .subscribe(data => this.contract_list = Object.entries(data)[12][1],
                  error => this.errorMsg = error);

    this.contractModel = new Contract(this.professorId,null,null,null,null);
  }

  onDelete(id){

  }


  onSelected(id,edit = null){

    if(edit){
      this.contractId = id;
      this._contractService.getContractById(id)
      .subscribe(data => this.contractModel = new Contract(data['prof_id'],data['title'],data['description'],data['startsAt'],data['endsAt']),
          error => this.errorMsg = error);

          this.formState = 'editContract';
    }else{
      this._contractService.getContractById(id)
      .subscribe(data => this.currentContract = data,
          error => this.errorMsg = error);

          this.formState = 'newContract';

    }

  }

  selectedTab(tab){
    console.log(tab)
    if(tab == 'details'){
      this.new_contract_tab = null;
      this.details_tab = true;
    }else{
      this.new_contract_tab = true;
      this.details_tab = null;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


   //find and update contract list from response
   updateContractList(data) {
    this.contract_list.forEach(function (value) {
      if(data['id'] == value.id){
        value.title = data['title'];
        value.description = data['description'];
        value.startsAt = data['startsAt'];
        value.endsAt = data['endsAt'];
      }
    });
  }


  onSubmit() {
    console.log(this.contractModel)
    if(this.formState == 'newContract'){
      this._contractService.createContract(this.contractModel)
        .subscribe(
          data => this.contract_list.push(data),
          error => console.log('Error!', error)
        )
    }else if(this.formState == 'editContract'){
      this._contractService.editContract(this.contractModel,this.contractId)
        .subscribe(
          data => this.updateContractList(data),
          error => console.log('Error!', error)
        )

        console.log('response data',this.editResponse)
    }


  }



}
