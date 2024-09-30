import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBackoffice: string = environment.apiBackoffice;

  constructor(
    private http: HttpClient,
  ){}


  getArticles(page?: number, status?: string, search?: string): Observable<any> {
    page = !page ? 1 : page
    status = !status ? '' : status
    search = !search ? '' : search
    return this.http.get<any>(`${this.apiBackoffice}/articles?page=${page}&status=${status}&search=${search}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getArticle(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiBackoffice}/articles/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  createArticle(article: Article): Observable<any> {
    return this.http.post<any>(`${this.apiBackoffice}/articles`, { article: article }).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getAds(search?: string): Observable<any> {
    search = search ? search : "";
    return this.http.get<any>(`${this.apiBackoffice}/ads?search=${search}`).pipe(
      map((res: any) => {
        return res.ads;
      })
    )
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${this.apiBackoffice}/articles/tags`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  searchItems(search: string, type: string): Observable<any> {
    if(type==='ad') {
      return this.getAds(search).pipe(
        map((res: any) => {
          return res;
        })
      )
    }else if (type=='article'){
      return this.getArticles(undefined, undefined, search).pipe(
        map((res: any) => {
          return res;
        })
      )
    }else {
      return this.getTags().pipe(
        map((res: string[]) => {
          return res;
        })
      )
    }
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiBackoffice}/users`).pipe(
      map((res: any) => {
        return res.users;
      })
    )
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiBackoffice}/users/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  updateUser(user: User): Observable<any> {
    const boUser: any = { backoffice_user: user }
    return this.http.put<any>(`${this.apiBackoffice}/users/${user.id}`, boUser).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getComments(page?: number, status?: string, search?: string): Observable<any> {
    page = !page ? 1 : page
    status = !status ? '' : status
    search = !search ? '' : search
    return this.http.get<any>(`${this.apiBackoffice}/comments?page=${page}&status=${status}&search=${search}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  updateComment(status: string, id: string): Observable<any> {
    return this.http.put<any>(`${this.apiBackoffice}/comments/${id}`, { status: status, id: id }).pipe(
      map((res: any) => {
        return res;
      })
    )
  }
}
