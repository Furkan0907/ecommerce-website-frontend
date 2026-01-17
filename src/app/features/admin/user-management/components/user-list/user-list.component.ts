import { OnInit } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { User, UserRequest } from './../../../../../core/models/user.model';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading: boolean = false;
  error?: string;

  searchTerm: string = '';
  selectedRole: string = 'ALL';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;

    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.error = 'Users could not load.';
        console.error(this.error, err);
      }
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.username.toLowerCase().includes(term) ||
                            user.email.toLowerCase().includes(term);
      const matchesRole = this.selectedRole === 'ALL' || user.role === this.selectedRole;

      return matchesSearch && matchesRole;
    });
  }

  isUserAdmin(id: number): boolean {
    const foundUser = this.users.find(u => u.id === id);
    return foundUser?.role === 'ADMIN';
  }


  deleteUser(id: number) {
    if (confirm('Are you sure to delete this user?')) {
      this.userService.delete(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.applyFilters();
        },
        error: err => {
          this.error = 'User could not deleted.';
          console.error(this.error, err);
        }
      });
    }
  }

  editUser(id: number) {
    alert('Edit Başarılı.');
  }


  updateUserRole(user: User, newRole: string) {
    const request: UserRequest = {
      username: user.username,
      email: user.email,
      role: newRole
    };

    this.userService.update(user.id, request).subscribe({
      next: () => {
        user.role = newRole;
        alert('Role updated.');
        this.applyFilters();
      },
      error: () => {
        this.error = 'Update failed.';
      }
    });
  }

  setBanStatus(user: User, status: boolean) {
    user.isBanned = status ? 'true' : 'false';
  }
}
