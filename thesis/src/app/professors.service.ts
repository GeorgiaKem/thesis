import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  getProfessors(): Observable<IProfessor[]> {

    return this.http.get<IProfessor[]>(this._url)
              .pipe(catchError(this.errorHandler));

  }

  getProfessorById(id: number): Observable<IProfessor[]> {
    let _url1 = "http://thesis-api.test/api/professor/"+id
    return this.http.get<IProfessor[]>(_url1)
              .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
}
