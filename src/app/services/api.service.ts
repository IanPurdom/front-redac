import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/article';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  )
  {
  }

  private httpOptions(): any {
  
    let options: { headers?: HttpHeaders, params?: HttpParams } = {};

    
      options['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });

    return options;
  }

  public getHeadlineArticles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles/headlines`, this.httpOptions()).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  public getArticles(head_tag?: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/articles?head_tag=${head_tag}`, this.httpOptions()).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  public getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articles/${id}`, this.httpOptions()).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
}
