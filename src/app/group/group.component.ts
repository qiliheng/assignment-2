import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups: any[] = [];
  channels: any[] = [];
  selectedGroup: any = null;
  joinedGroups: any[] = []; // Array to keep track of joined groups

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

    if (this.joinedGroups.includes(groupId)) {
      this.channels = this.selectedGroup.channels;
    } else {
      this.channels = []; // Clear channels if the group is not joined
      console.log('You need to join the group first before accessing its channels.');
    }
  }

  joinGroup(groupId: number) {
    console.log('Joining group:', groupId);
  
    if (!this.joinedGroups.includes(groupId)) {
      this.joinedGroups.push(groupId);
      console.log(`Group ${groupId} joined successfully.`);
      alert(`You have successfully joined the group: ${this.selectedGroup.name}`);  // Show success alert
  
      if (this.selectedGroup && this.selectedGroup.id === groupId) {
        this.channels = this.selectedGroup.channels;
      }
    } else {
      console.log(`Already joined group ${groupId}.`);
      alert(`You have already joined the group: ${this.selectedGroup.name}`);
    }
  }
  

  joinChannel(channelId: number) {
    console.log('Joining channel:', channelId);

    if (this.joinedGroups.includes(this.selectedGroup.id)) {
      const channel = this.channels.find(c => c.channelId === channelId);

      if (channel) {
        const userId = sessionStorage.getItem('userid'); // Assuming user ID is stored in session
        console.log(`User ${userId} is joining channel ${channel.channelName} in group ${this.selectedGroup.name}`);
      } else {
        console.error('Channel not found');
      }
    } else {
      console.error('You need to join the group before joining a channel.');
    }
  }
}
