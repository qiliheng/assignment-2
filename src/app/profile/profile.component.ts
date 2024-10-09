import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const BACKEND_URL = 'http://s5294121.elf.ict.griffith.edu.au:8888';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userid = 0;
  username = '';
  userbirthdate = '';
  userage = 0;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Initialize component with session data
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';
      this.userbirthdate = sessionStorage.getItem('userbirthdate') || '';
      this.userage = Number(sessionStorage.getItem('userage') || 0);
      this.userid = Number(sessionStorage.getItem('userid') || 0);
    }
  }

  // Function to update user profile
  editFunc() {
    const userobj = {
      userid: this.userid,
      username: this.username,
      userbirthdate: this.userbirthdate,
      userage: this.userage
    };

    // Send POST request to update profile on the server
    this.httpClient.post<any>(BACKEND_URL + '/loginafter', userobj, httpOptions)
      .subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          alert("Profile update successful");

          // Update session data after a successful response
          sessionStorage.setItem('userid', String(this.userid));
          sessionStorage.setItem('username', this.username);
          sessionStorage.setItem('userbirthdate', this.userbirthdate);
          sessionStorage.setItem('userage', String(this.userage));
        },
        error: (error) => {
          console.error('An error occurred while updating the profile:', error);
          alert("An error occurred while updating the profile. Please try again.");
        }
      });
  }
}
