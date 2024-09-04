import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,  // <-- Make sure RouterOutlet is imported
    RouterLink     // <-- Import RouterLink to use in the template
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'assignment1';

  isLoggedIn: boolean = false;
  username: string | null = '';
  userRole: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        this.username = sessionStorage.getItem('username');
        const rolesString = sessionStorage.getItem('roles');
        if (rolesString) {
          const roles = JSON.parse(rolesString);  // Parse roles as array
          this.userRole = roles.includes('super-admin') ? 'super-admin' : null;
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login'); 
  }
}
