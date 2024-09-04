import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://s5294121.elf.ict.griffith.edu.au:8888'; // Change to the correct base URL

  constructor(private http: HttpClient) { }

  promoteToGroupAdmin(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/promoteToGroupAdmin`, { userId });
  }

  promoteToSuperAdmin(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/promoteToSuperAdmin`, { userId });
  }

  removeUser(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeUser`, { userId });
  }
}
