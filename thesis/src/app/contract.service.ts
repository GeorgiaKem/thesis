import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IContract } from 'contract';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contract } from './contract';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  getContractById(id: number): Observable<IContract[]> {
    let _url: string = "http://thesis-api.test/api/contract/show/"+id
    return this.http.get<IContract[]>(_url)
              .pipe(catchError(this.errorHandler));
  }

  createContract(contract: Contract){
    let _url1 = 'http://thesis-api.test/api/contract/create';
    return this.http.post<any>(_url1, contract);
  }

  editContract(contract: Contract, id){
    let _url2 = 'http://thesis-api.test/api/contract/update/'+id;
    return this.http.post<any>(_url2, contract);
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
}
