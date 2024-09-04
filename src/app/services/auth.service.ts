import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn = this.loggedIn.asObservable();

  private hasToken(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !!sessionStorage.getItem('username');
    }
    return false;
  }

  login(data: any) {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      if (data.id !== undefined) {
        sessionStorage.setItem('userid', data.id.toString());
      }

      sessionStorage.setItem('userlogin', data.ok.toString());

      if (data.username !== undefined) {
        sessionStorage.setItem('username', data.username);
      }

      if (data.email !== undefined) {
        sessionStorage.setItem('email', data.email);
      }

      if (data.roles !== undefined) {
        sessionStorage.setItem('roles', JSON.stringify(data.roles));
      }

      this.loggedIn.next(true);
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.clear();
      this.loggedIn.next(false);
    }
  }
}
