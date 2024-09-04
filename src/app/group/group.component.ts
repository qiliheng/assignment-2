import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchGroups();
  }

  fetchGroups() {
    this.http.get<any>('http://localhost:8888/getGroups').subscribe(
      response => {
        if (response.success) {
          this.groups = response.groups;
        } else {
          console.error('Failed to fetch groups');
        }
      },
      error => {
        console.error('Error fetching groups:', error);
      }
    );
  }
}
