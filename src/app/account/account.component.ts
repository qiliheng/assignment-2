import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';
      this.userbirthdate = sessionStorage.getItem('userbirthdate') || '';
      this.userage = Number(sessionStorage.getItem('userage') || 0);
      this.userid = Number(sessionStorage.getItem('userid') || 0);
    }
  }
}
