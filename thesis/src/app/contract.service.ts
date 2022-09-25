import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

    let token = localStorage.getItem('access_token');

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });
    let _url: string = "http://thesis-api.test/api/contract/show/" + id
    return this.http.get<IContract[]>(_url, { headers: httpHeaders })
      .pipe(catchError(this.errorHandler));
  }

  createContract(contract: Contract) {
    let token = localStorage.getItem('access_token');

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });

    let _url1 = 'http://thesis-api.test/api/contract/create';
    return this.http.post<any>(_url1, contract, { headers: httpHeaders });
  }

  getSemesterList() {
    let token = localStorage.getItem('access_token');

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });

    let _url1 = 'http://thesis-api.test/api/semester_list';
    return this.http.get<any>(_url1, { headers: httpHeaders });
  }

  editContract(contract: Contract, id) {
    let token = localStorage.getItem('access_token');

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });

    let _url2 = 'http://thesis-api.test/api/contract/update/' + id;
    return this.http.post<any>(_url2, contract, { headers: httpHeaders });
  }
  delete(id) {
    let token = localStorage.getItem('access_token');

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });

    let _url2 = 'http://thesis-api.test/api/contract/delete/' + id;
    return this.http.delete<any>(_url2, { headers: httpHeaders });
  }

  downloadFile(contract: Contract) {
    let token = localStorage.getItem('access_token');
    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });
    let _url3 = 'http://thesis-api.test/api/contract/download';
    return this.http.post<any>(_url3, contract, { headers: httpHeaders, responseType: 'blob' as 'json' });
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
