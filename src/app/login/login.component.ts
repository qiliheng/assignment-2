import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

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

  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService) {}

  submit() {
    let user = { email: this.email, pwd: this.password };

    this.httpClient.post(BACKEND_URL + '/login', user, httpOptions)
      .subscribe((data: any) => {
        alert("Posting: " + JSON.stringify(user));
        alert("Post response: " + JSON.stringify(data));

        if (data.ok) {
          alert("Login successful");
          this.authService.login(data);  // Update the auth service with the logged-in user's data
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
