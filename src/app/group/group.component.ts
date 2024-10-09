import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [
    {
      provide: Socket,
      useFactory: () => new Socket({ url: 'http://s5294121.elf.ict.griffith.edu.au:8888', options: {} })
    }
  ]
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
  userRole: string[] = [];
  messageContent: string = '';
  messages: { username: string, text: string }[] = [];
  ioConnection!: Subscription;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
    private socket: Socket
  ) {}

  ngOnInit() {
    // Check if running in browser and load user details from session
    if (isPlatformBrowser(this.platformId)) {
      this.username = sessionStorage.getItem('username') || '';
      this.userRole = JSON.parse(sessionStorage.getItem('roles') || '[]');
    }

    // Fetch group data on component load
    this.httpClient.get('http://s5294121.elf.ict.griffith.edu.au:8888/server/data/group.json').subscribe(
      (data: any) => {
        this.groups = data;
      },
      (error: any) => {
        console.error('Error loading groups', error);
      }
    );

    // Initialize socket for chat
    this.initIoConnection();
  }

  // Set up socket connection
  private initIoConnection() {
    this.ioConnection = this.socket.fromEvent<{ username: string, text: string, channelId: number }>('message')
      .subscribe((data) => {
        if (data.channelId === this.selectedGroup?.id) {
          this.messages.push({ username: data.username, text: data.text });
        }
      });
  }

  // Send chat message by socket
  public chat() {
    if (this.messageContent.trim()) {
      const messageData = {
        text: this.messageContent,
        username: this.username,
        channelId: this.selectedGroup ? this.selectedGroup.id : null
      };
      this.socket.emit('message', messageData);
      this.messageContent = ''; // Clear input after sending
    }
  }

  // Select a group and load channels when join
  selectGroup(groupId: number) {
    this.selectedGroup = this.groups.find(group => group.id === groupId);
    if (this.joinedGroups.includes(groupId)) {
      this.channels = this.selectedGroup.channels;
    } else {
      this.channels = [];
      console.log('You need to join the group first before accessing its channels.');
    }
  }

  // Join a selected group
  joinGroup(groupId: number) {
    this.selectedGroup = this.groups.find(group => group.id === groupId);
    if (!this.joinedGroups.includes(groupId)) {
      this.joinedGroups.push(groupId);
      alert(`You have successfully joined the group: ${this.selectedGroup.name}`);
      this.channels = this.selectedGroup.channels;
    } else {
      alert(`You have already joined the group: ${this.selectedGroup.name}`);
    }
  }

  // Join a channel within a joined group
  joinChannel(channelId: number) {
    if (this.joinedGroups.includes(this.selectedGroup.id)) {
      const channel = this.channels.find(c => c.channelId === channelId);
      if (channel) {
        this.messages = []; // Clear messages for new channel
        alert('Joined channel successfully');
      } else {
        console.error('Channel not found');
      }
    } else {
      console.error('You need to join the group before joining a channel.');
    }
  }

  // Create new group
  createGroup() {
    const newGroup = {
      name: this.newGroupName,
      description: this.newGroupDescription || '',
      createdBy: this.username
    };

    this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/createGroup', newGroup).subscribe(
      (data: any) => {
        this.groups.push(data);
        alert(`Group ${this.newGroupName} created successfully!`);
      },
      (error: any) => {
        alert('There was a problem creating the group.');
      }
    );
  }

  // Create a new channel in selected group
  createChannel() {
    const newChannel = {
      groupId: this.selectedGroup.id,
      name: this.newChannelName,
      description: this.newChannelDescription || '',
      createdBy: this.username
    };

    this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/createChannel', newChannel).subscribe(
      (data: any) => {
        this.selectedGroup.channels.push(data);
        alert(`Channel ${this.newChannelName} created successfully!`);
      },
      (error: any) => {
        alert('You are not authorized to create a channel in this group.');
      }
    );
  }

  // Delete the selected group
  deleteGroup() {
    if (confirm('Are you sure you want to delete this group?')) {
      const groupId = this.selectedGroup.id;
      this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/deleteGroup', { groupId, username: this.username }).subscribe(
        (response: any) => {
          this.groups = this.groups.filter(group => group.id !== groupId);
          this.selectedGroup = null;
          alert('Group deleted successfully');
        },
        (error: any) => {
          alert('There was a problem deleting the group.');
        }
      );
    }
  }

  // Delete a channel within the selected group
  deleteChannel(channelId: number) {
    const deleteData = {
      channelId: channelId,
      groupId: this.selectedGroup.id,
      username: this.username
    };

    this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/deleteChannel', deleteData).subscribe(
      (response: any) => {
        this.selectedGroup.channels = this.selectedGroup.channels.filter((c: any) => c.id !== channelId);
        alert('Channel deleted successfully!');
      },
      (error: any) => {
        alert('There was a problem deleting the channel.');
      }
    );
  }
}
