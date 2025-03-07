import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  errorMessage: string | null = null;

  constructor(private userService: UserService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('User List');
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
        users.forEach(user => {
          this.userService.getPosts(user.id).subscribe({
            next: posts => {
              user.postCount = posts.length;
            },
            error: error => {
              console.error(error);
              this.errorMessage = error.message;
            }
          });
        });
      },
      error: error => {
        console.error(error);
        this.errorMessage = error.message;
      }
    });
  }
}