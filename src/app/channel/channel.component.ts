import { Component, inject } from '@angular/core';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
  standalone: true
})
export class ChannelComponent {
  private channelService = inject(ChannelService);

  createChannel(channelName: string, groupId: string) {
    this.channelService.createChannel(channelName, groupId);
  }

  // Other methods to manage channels
}
