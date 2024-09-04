import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups: any[] = [];
  channels: any[] = [];
  selectedGroup: any = null;
  joinedGroups: any[] = [];

  newGroupName: string = '';
  newGroupDescription: string = '';

  newChannelName: string = '';
  newChannelDescription: string = '';

  username: string = '';

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';
    }

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
      this.channels = [];
      console.log('You need to join the group first before accessing its channels.');
    }
  }

  joinGroup(groupId: number) {
    console.log('Joining group:', groupId);

    this.selectedGroup = this.groups.find(group => group.id === groupId);
  
    if (!this.joinedGroups.includes(groupId)) {
      this.joinedGroups.push(groupId);
      console.log(`Group ${groupId} joined successfully.`);
      alert(`You have successfully joined the group: ${this.selectedGroup.name}`);

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
        const userId = isPlatformBrowser(this.platformId) ? sessionStorage.getItem('userid') : null;
        console.log(`User ${userId} is joining channel ${channel.name} in group ${this.selectedGroup.name}`);
        alert("joined perfectly")
      } else {
        console.error('Channel not found');
      }
    } else {
      console.error('You need to join the group before joining a channel.');
    }
  }

  createGroup() {
    const username = this.username;

    const newGroup = {
      name: this.newGroupName,
      description: this.newGroupDescription || "",
      createdBy: username
    };

    this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/createGroup', newGroup)
      .subscribe(
        (data: any) => {
          console.log('Group created successfully:', data);
          this.groups.push(data);
          alert(`Group ${this.newGroupName} created successfully!`);
        },
        (error: any) => {
          console.error('Error creating group:', error);
          alert('There was a problem creating the group.');
        }
      );
  }

  createChannel() {
    const username = this.username;
    const groupId = this.selectedGroup.id;

    const newChannel = {
      groupId: groupId,
      name: this.newChannelName,
      description: this.newChannelDescription || "",
      createdBy: username
    };

    this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/createChannel', newChannel)
      .subscribe(
        (data: any) => {
          console.log('Channel created successfully:', data);
          this.selectedGroup.channels.push(data);
          alert(`Channel ${this.newChannelName} created successfully!`);
        },
        (error: any) => {
          console.error('Error creating channel:', error);
          alert('You are not authorized to create a channel in this group.');
        }
      );
  }

  deleteGroup() {
    if (confirm('Are you sure you want to delete this group?')) {
      const groupId = this.selectedGroup.id;
      const username = this.username;

      this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/deleteGroup', { groupId, username })
        .subscribe(
          (response: any) => {
            console.log(response.message);
            this.groups = this.groups.filter(group => group.id !== groupId);
            this.selectedGroup = null;
            alert('Group deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting group:', error);
            alert('There was a problem deleting the group.');
          }
        );
    }
  }

  deleteChannel(channelId: number) {
    const username = sessionStorage.getItem('username'); // Get the logged-in username
    const groupId = this.selectedGroup.id; // Assume selectedGroup is already set

    const deleteData = {
        channelId: channelId,
        groupId: groupId,
        username: username
    };

    this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/deleteChannel', deleteData)
      .subscribe(
        (response: any) => {
          console.log('Channel deleted successfully:', response);
          // Explicitly define the type of 'c' as 'any'
          this.selectedGroup.channels = this.selectedGroup.channels.filter((c: any) => c.id !== channelId);
          alert('Channel deleted successfully!');
        },
        (error: any) => {
          console.error('Error deleting channel:', error);
          alert('There was a problem deleting the channel.');
        }
      );
}

}
