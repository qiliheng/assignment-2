import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [FormsModule], // Import FormsModule here
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent {
  userId!: number;

  constructor(private userService: UserService) {}

  promoteToGroupAdmin() {
    this.userService.promoteToGroupAdmin(this.userId).subscribe(response => {
      console.log(response.message);
      alert(response.message);
    }, error => {
      console.error(error);
      alert('Failed to promote user to Group Admin');
    });
  }

  promoteToSuperAdmin() {
    this.userService.promoteToSuperAdmin(this.userId).subscribe(response => {
      console.log(response.message);
      alert(response.message);
    }, error => {
      console.error(error);
      alert('Failed to promote user to Super Admin');
    });
  }

  removeUser() {
    this.userService.removeUser(this.userId).subscribe(response => {
      console.log(response.message);
      alert(response.message);
    }, error => {
      console.error(error);
      alert('Failed to remove user');
    });
  }
}
