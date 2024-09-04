import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  username = '';
  email = '';
  password = '';

  constructor(private httpClient: HttpClient) {}

  createUser() {
    const newUser = {
      username: this.username,
      email: this.email,
      pwd: this.password,
      roles: ["chat-user"] 
    };

    this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/createUser', newUser, httpOptions)
      .subscribe(
        (data: any) => {
          alert(JSON.stringify(data));
          if (data.success) {
            console.log('User created successfully:', data);
          } else {
            console.error('Error:', data.message);
          }
        },
        (error: any) => {
          console.error('Error creating user:', error);
          alert("username already be there")
        }
      );
  }
}
