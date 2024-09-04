import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent {
  username: string = '';  

  constructor(private userService: UserService) {}

  promoteToGroupAdmin() {
    this.userService.promoteToGroupAdmin(this.username).subscribe(response => {
      console.log(response.message);
      alert(response.message);
    }, error => {
      console.error(error);
      alert('Failed to promote user to Group Admin');
    });
  }

  promoteToSuperAdmin() {
    this.userService.promoteToSuperAdmin(this.username).subscribe(response => {
      console.log(response.message);
      alert(response.message);
    }, error => {
      console.error(error);
      alert('Failed to promote user to Super Admin');
    });
  }

  removeUser() {
    this.userService.removeUser(this.username).subscribe(response => {
      console.log(response.message);
      alert(response.message);
    }, error => {
      console.error(error);
      alert('Failed to remove user');
    });
  }
}
