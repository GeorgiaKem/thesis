import { Injectable } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  //authUrl = 'http://thesis-api:4200/oauth/token';
  authUrl = 'http://thesis-api.test/sign-in'
  apiUrl = 'http://thesis-api:4200/api';
  options: any;

  constructor(
    private http: HttpClient
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };

  }
  /**
  * Get an access token
  * @param e The email address
  * @param p The password string
  */
  login(e: string, p: string) {
    console.log('service')
    return this.http.post(this.authUrl, {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'srKHlpLcnyLaBhZmQsAIuztgY7C0N8gjZPFKjYgu',
      username: e,
      password: p,
      scope: ''
    }, this.options);
  }  /**
   * Revoke the authenticated user token
   */
  logout() {
    this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    return this.http.get(this.apiUrl + '/token/revoke', this.options);
  }
}
