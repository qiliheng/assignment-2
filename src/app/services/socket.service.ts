import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {}

  initSocket(): void {
    this.socket.connect();
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  getMessage(): Observable<string> {
    return this.socket.fromEvent<string>('message');
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
