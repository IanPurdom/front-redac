import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from '../models/article';
import { ApiService } from './api.service';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private apiService: ApiService
  ) {}

  public getArticles(page?: number, status?: string): Observable<Article[]> {
    return this.apiService.getArticles(page, status).pipe(
      map((res: Article[]) => {
        return res;
    }))
  }
}
