import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class userService {
  constructor(
    private apiService: ApiService
  ) {}


  getUsers(): Observable<User[]> {
    return this.apiService.getUsers().pipe(
      map((res: User[]) => {
        return res;
      })
    )
  }

  getUser(id: string): Observable<User> {
    return this.apiService.getUser(id).pipe(
      map((res: User) => {
        return res;
      })
    )
  }

  updateUser(user: User) : Observable<User> {
    return this.apiService.updateUser(user).pipe(
      map((res: User) => {
        return res;
      })
    )
  }
}