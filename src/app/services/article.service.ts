import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, map } from 'rxjs';
import { Article } from '../models/article';
import { ApiService } from './api.service';
import { Comment } from '../models/comment';
import { SessionStorageService } from './session-storage.service';
import { Ad } from '../models/ad';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article$: ReplaySubject<Article>;

  constructor(
    private apiService: ApiService,
    private sessionStorage: SessionStorageService
  ) {
    let sessionArticle = sessionStorage.getItem('article');
    this.article$ = new ReplaySubject<Article>(1);
    this.article$.subscribe((res: Article) => {
      this.sessionStorage.setItem('article', res);
    })

    if (sessionArticle) this.article$.next(sessionArticle)
  }

  getArticles(page?: number, status?: string): Observable<Article[]> {
    return this.apiService.getArticles(page, status).pipe(
      map((res: Article[]) => {
        return res;
    }))
  }
  
  getArticle(id: string): Observable<Article> {
    return this.apiService.getArticle(id).pipe(
      map((res: Article) => {
        return res;
      })
    )
  }

  createArticle(article: Article): Observable<any> {
    return this.apiService.createArticle(article).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getAds(): Observable<Ad[]> {
    return this.apiService.getAds().pipe(
      map((res: Ad[]) => {
        return res;
      })
    )
  }

  searchArticles(search: string, page: number, status?: string): Observable<Article[]> {
    return this.apiService.searchArticles(search, page, status).pipe(
      map((res: Article[]) => {
        return res;
      })
    )
  }

  searchItems(search: string, type: string): Observable<Ad[]> {
    return this.apiService.searchItems(search, type).pipe(
      map((res: any[]) => {
        return res;
      })
    )
  }
}
