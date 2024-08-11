import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBackoffice: string = environment.apiBackoffice;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}

  private httpOptions(): any {
    let options: { headers?: HttpHeaders, params?: HttpParams } = {};

      options['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });

    return options;
  }

  getArticles(page?: number, status?: string): Observable<any> {
    page = !page ? 1 : page
    status = !status ? '' : status
    return this.http.get<any>(`${this.apiBackoffice}/articles?page=${page}&status=${status}`, this.httpOptions()).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiBackoffice}/users`, this.httpOptions()).pipe(
      map((res: any) => {
        return (res);
      })
    )
  }
}
