import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,AccountComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'week4tut';
}
