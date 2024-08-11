import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ManageService {
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
}