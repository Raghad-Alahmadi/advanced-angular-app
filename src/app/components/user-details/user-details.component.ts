import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  posts: any[] = [];
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(+userId).subscribe({
        next: user => {
          this.user = user;
          this.userService.getPosts(user.id).subscribe({
            next: posts => {
              this.posts = posts;
            },
            error: error => {
              console.error(error);
              this.errorMessage = error.message;
            }
          });
        },
        error: error => {
          console.error(error);
          this.errorMessage = error.message;
        }
      });
    }
  }
}