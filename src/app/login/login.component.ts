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
    let user = { email: this.email, pwd: this.password };
  
    this.httpClient.post(BACKEND_URL + '/login', user, httpOptions)
      .subscribe((data: any) => {
        alert("Posting: " + JSON.stringify(user));
        alert("Post response: " + JSON.stringify(data));
  
        if (data.ok) {
          alert("Login successful");
  
          if (data.id !== undefined) {
            sessionStorage.setItem('userid', data.id.toString());
          } else {
            console.error('User ID is undefined');
          }
  
          sessionStorage.setItem('userlogin', data.ok.toString());
  
          if (data.username !== undefined) {
            sessionStorage.setItem('username', data.username);
          } else {
            console.error('Username is undefined');
          }
  
          if (data.email !== undefined) {
            sessionStorage.setItem('email', data.email);
          } else {
            console.error('Email is undefined');
          }
  
          if (data.roles !== undefined) {
            sessionStorage.setItem('roles', JSON.stringify(data.roles));
          } else {
            console.error('Roles are undefined');
          }
  
          this.router.navigateByUrl('/account');
        } else {
          alert("Email or password incorrect");
          this.router.navigateByUrl('/login');
        }
      }, error => {
        console.error('An error occurred:', error);
        alert('An error occurred while logging in. Please try again.');
      });
  }
  
}
