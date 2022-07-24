import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPermit } from '../../permit';
import { Permit } from './permit';

@Injectable({
  providedIn: 'root'
})
export class PermitService {

  constructor(private http: HttpClient) { }

  getPermitById(id: number): Observable<IPermit[]> {
    let _url: string = "http://thesis-api.test/api/permit/show/" + id
    return this.http.get<IPermit[]>(_url)
      .pipe(catchError(this.errorHandler));
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

  createPermit(permit: Permit) {
    let _url1 = 'http://thesis-api.test/api/permit/create';
    return this.http.post<any>(_url1, permit);
  }

  editPermit(permit: Permit, id) {
    let _url2 = 'http://thesis-api.test/api/permit/update/' + id;
    return this.http.post<any>(_url2, permit);
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
