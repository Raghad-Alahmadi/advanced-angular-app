import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to fetch users. Please try again later.'));
      })
    );
  }

  getPosts(userId: number): Observable<any[]> {
    const postsUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    return this.http.get<any[]>(postsUrl).pipe(
      catchError(error => {
        console.error('Error fetching posts:', error);
        return throwError(() => new Error('Failed to fetch posts. Please try again later.'));
      })
    );
  }
}