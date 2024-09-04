import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],  // Ensure CommonModule, NgIf, and NgFor are imported
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups: any[] = [];
  channels: any[] = [];
  selectedGroup: any = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('http://s5294121.elf.ict.griffith.edu.au:8888/server/data/group.json')
      .subscribe(
        (data: any) => {
          this.groups = data;
        },
        (error: any) => {
          console.error('Error loading groups', error);
        }
      );
  }

  selectGroup(groupId: number) {
    console.log('Group selected:', groupId);
    this.selectedGroup = this.groups.find(group => group.id === groupId);

    this.httpClient.get(`http://s5294121.elf.ict.griffith.edu.au:8888/server/data/channel/${groupId}`)
      .subscribe(
        (data: any) => {
          this.channels = data.channels;
        },
        (error: any) => {
          console.error('Error loading channels', error);
        }
      );
  }
}

