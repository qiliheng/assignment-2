import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

// Define HTTP options with headers
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// Backend URL for API requests
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

  // Method to handle form submission
  submit() {
    const user = { email: this.email, pwd: this.password };

    // Send login request to the backend
    this.httpClient.post(BACKEND_URL + '/login', user, httpOptions)
      .subscribe((data: any) => {
        alert("Posting: " + JSON.stringify(user));  // Display submitted user data
        alert("Post response: " + JSON.stringify(data)); 

        // Check if login was successful
        if (data.ok) {
          alert("Login successful");
          this.authService.login(data);  
          this.router.navigateByUrl('/account');  // Navigate to account page on success
        } else {
          alert("Email or password incorrect");
          this.router.navigateByUrl('/login');  // Redirect back to login on failure
        }
      }, error => {
        console.error('An error occurred:', error);
        alert('An error occurred while logging in. Please try again.');  // Show error alert
      });
  }
}
