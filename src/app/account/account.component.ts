import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userId: string | null = '';
  userName: string | null = '';
  userBirthdate: string | null = '';
  userAge: string | null = '';

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      this.userId = sessionStorage.getItem('userid');
      this.userName = sessionStorage.getItem('username');
      this.userBirthdate = sessionStorage.getItem('userbirthdate');
      this.userAge = sessionStorage.getItem('userage');
    } else {
      console.error('sessionStorage is not available');
    }
  }
}
