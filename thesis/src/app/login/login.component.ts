import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        localStorage.setItem('access_token', JSON.parse(params.access_token).original.token);

        if (JSON.parse(params.access_token).original.token) {
          window.location.href = '/professors';
        }

      }
      );
  }

  login(): void {
    window.location.href = 'http://thesis-api.test/sign-in';
    //this.router.navigate(['/login']);
    this.authService.login('asd@asd.com', 'asd')
      .subscribe((res: any) => {
        console.log('success')
        // Store the access token in the localstorage
        localStorage.setItem('access_token', res.access_token);
        //this.loading = false;
        // Navigate to home page

      }, (err: any) => {
        console.log('error')
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        //this.loading = false;
        //this.errors = true;
      });
  }

}
