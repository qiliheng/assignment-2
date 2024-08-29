import { Component, Inject, PLATFORM_ID } from '@angular/core';
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
export class ProfileComponent {
  userid = 0;
  username = '';
  userbirthdate = '';
  userage = 0;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';
      this.userbirthdate = sessionStorage.getItem('userbirthdate') || '';
      this.userage = Number(sessionStorage.getItem('userage') || 0);
      this.userid = Number(sessionStorage.getItem('userid') || 0);
    }
  }

  editFunc() {
    let userobj = {
      "userid": this.userid,
      "username": this.username,
      "userbirthdate": this.userbirthdate,
      "userage": this.userage
    };

    this.httpClient.post<any>(BACKEND_URL + '/loginafter', userobj, httpOptions)
      .subscribe((m: any) => { (JSON.stringify(m)); });
      alert("successful")
  }
}
