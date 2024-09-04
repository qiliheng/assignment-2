import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://s5294121.elf.ict.griffith.edu.au:8888'; // Change to the correct base URL

  constructor(private http: HttpClient) { }

promoteToGroupAdmin(username: string) {
  return this.http.post<any>(`${this.baseUrl}/promoteToGroupAdmin`, { username });
}

promoteToSuperAdmin(username: string) {
  return this.http.post<any>(`${this.baseUrl}/promoteToSuperAdmin`, { username });
}

removeUser(username: string) {
  return this.http.post<any>(`${this.baseUrl}/removeUser`, { username });
}

}
