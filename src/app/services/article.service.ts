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

  public getHeadlineArticles(): Observable<any> {
    return this.apiService.getHeadlineArticles().pipe(
      map((res: Article[]) => {
        return res;
      })
    )
  }

  public getArticles(tag?: string): Observable<Article[]> {
    return this.apiService.getArticles(tag).pipe(
      map((res: Article[]) => {
        return res;
    }))
  }

  public getArticle(id: string): Observable<Article> {
    return this.apiService.getArticle(id).pipe(
      map((res: Article) => {
        return res;
      })
    )
  }
}
