import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private apiService: ApiService
  ) {}


  getComments(page?: number, status?: string, search?: string): Observable<Comment[]> {
    return this.apiService.getComments(page, status, search).pipe(
      map((res: Comment[]) => {
        return res;
      })
    )
  }

  updateComment(status: string, id: string): Observable<any> {
    return this.apiService.updateComment(status, id).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
}
