import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const BACKEND_URL = 'http://s5294121.elf.ict.griffith.edu.au:8888';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private httpClient: HttpClient) {}

  submit() {
    let user = { username: this.email, pwd: this.password };

    this.httpClient.post(BACKEND_URL + '/login', user, httpOptions)
      .subscribe((data: any) => {
        alert("posting: " + JSON.stringify(user));
        alert("postRes: " + JSON.stringify(data));

        if (data.ok) {
          alert("correct");

          if (data.userid !== undefined) {
            sessionStorage.setItem('userid', data.userid.toString());
          } else {
            console.error('userid is undefined');
          }

          sessionStorage.setItem('userlogin', data.ok.toString());

          if (data.username !== undefined) {
            sessionStorage.setItem('username', data.username);
          } else {
            console.error('username is undefined');
          }

          if (data.userbirthdate !== undefined) {
            sessionStorage.setItem('userbirthdate', data.userbirthdate);
          } else {
            console.error('userbirthdate is undefined');
          }

          if (data.userage !== undefined) {
            sessionStorage.setItem('userage', data.userage.toString());
          } else {
            console.error('userage is undefined');
          }

          this.router.navigateByUrl('/account');
        } else {
          alert("email or password incorrect");
        }
      }, error => {
        console.error('An error occurred:', error);
        alert('An error occurred while logging in. Please try again.');
      });
  }
}
