import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [FormsModule] // Add FormsModule here
})
export class UserComponent {
  username = '';
  password = '';
  birthdate = '';
  age = 0;

  constructor(private httpClient: HttpClient) {}

  createUser() {
    const newUser = {
      username: this.username,
      pwd: this.password,
      userbirthdate: this.birthdate,
      userage: this.age
    };

    this.httpClient.post('http://s5294121.elf.ict.griffith.edu.au:8888/createUser', newUser, httpOptions)
      .subscribe(
        (data: any) => {
          alert(JSON.stringify(data));
          if (data.ok) {
            console.log('User created successfully:', data);
          } else {
            console.error('Error:', data.error);
          }
        },
        (error: any) => {
          console.error('Error creating user', error);
        }
      );
  }
}
