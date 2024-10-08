import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://s5294121.elf.ict.griffith.edu.au:8080/';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor() { }

  initSocket() {
    this.socket = io(SERVER_URL);
    return () => { this.socket.disconnect(); }
  }

  send(message: string) {
    this.socket.emit('message', message);
  }

  getMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }
}
