import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProfessor } from 'professor';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {

  private _url: string = "http://thesis-api.test/api/professors";

  constructor(private http: HttpClient) {
  }

  getProfessors(): Observable<IProfessor[]> {

    let token = localStorage.getItem('access_token');

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });

    return this.http.get<IProfessor[]>(this._url, { headers: httpHeaders })
      .pipe(catchError(this.errorHandler));

  }

  editType(id: number, state: boolean) {
    let token = localStorage.getItem('access_token');

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });

    let _url1 = "http://thesis-api.test/api/professor/edit/" + id
    return this.http.post<any>(_url1, JSON.stringify({ state: state }), { headers: httpHeaders })
      .pipe(catchError(this.errorHandler));

  }

  getProfessorById(id: number): Observable<IProfessor[]> {

    let token = localStorage.getItem('access_token');

    let httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Cache-Control': 'no-cache',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'

    });
    let _url1 = "http://thesis-api.test/api/professor/" + id
    return this.http.get<IProfessor[]>(_url1, { headers: httpHeaders })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.statusText == "Unauthorized") {
      localStorage.removeItem('access_token');
      window.location.href = 'http://thesis-api.test/sign-in';
    }
    console.log(error.message)
    return Observable.throw(error.message || "Server Error");
  }
}
