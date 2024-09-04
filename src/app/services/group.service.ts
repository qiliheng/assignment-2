import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupsUrl = 'http://s5294121.elf.ict.griffith.edu.au:8080/groups';


  constructor(private http: HttpClient) {}

  getGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.groupsUrl);
  }

  createGroup(groupName: string, createdBy: string): Observable<any> {
    const body = { groupName, createdBy };
    return this.http.post<any>(`${this.groupsUrl}/createGroup`, body);
  }
}
