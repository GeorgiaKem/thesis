import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thesis';
  loggedIn = false;


  constructor(private router: Router) {

  }

  ngOnInit(): void {
    let token = localStorage.getItem('access_token');
    if (token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');

  }




}
