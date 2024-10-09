import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;

  constructor() {
    // Initialize the connection to the Socket.IO server
    this.socket = io('http://s5294121.elf.ict.griffith.edu.au:8888', {
      transports: ['websocket', 'polling'],
      path: '/socket.io' // Ensure the path matches your server configuration
    });
  }

  // Method to emit events
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
}

onEvent(eventName: string): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on(eventName, (data: any) => {
            observer.next(data);
        });
    });
}
}