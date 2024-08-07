import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {

  listUsers = [
    { username: '12345@email.com', password: '1' },
    { username: '67890@email.com', password: '123' },
    { username: 's5294121@griffithuni.edu.au', password: '1234567' }
  ];

  username = "";
  password = "";

  constructor(private router: Router) {}

  itemClicked() {
    alert(`Username: ${this.username} and Password: ${this.password}`);
    let c = { username: this.username, password: this.password };
    let find = this.listUsers.some((e) => e.username === c.username && e.password === c.password);
    alert(find);
    if (find) {
      this.router.navigateByUrl('/account');
    } else {
      alert('Invalid username or password.');
    }
  }
}
