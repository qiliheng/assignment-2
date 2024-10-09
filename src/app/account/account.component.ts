import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userid = 0;
  username = '';
  userbirthdate = '';
  userage = 0;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Initialize user data from session storage
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';
      this.userbirthdate = sessionStorage.getItem('userbirthdate') || '';
      this.userage = Number(sessionStorage.getItem('userage') || 0);
      this.userid = Number(sessionStorage.getItem('userid') || 0);
    }
  }

  // Delete user account via POST request
  deleteAccount() {
    const username = sessionStorage.getItem('username');

    if (username) {
      const deleteUser = { username: username };

      this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/deleteUser', deleteUser)
        .subscribe(
          (response: any) => {
            console.log('User deleted:', response);
            alert('Your account has been deleted.');
            sessionStorage.clear();
            window.location.href = '/login';
          },
          (error: any) => {
            console.error('Deletion error:', error);
            alert('Error deleting account.');
          }
        );
    } else {
      console.error('No user logged in.');
      alert('No user logged in.');
    }
  }
}

