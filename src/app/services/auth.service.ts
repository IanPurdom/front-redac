import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable, throwError, BehaviorSubject, ReplaySubject  } from "rxjs";
import { AuthResponseData } from "../models/AuthResponseData";
import { catchError, tap } from 'rxjs/operators';
import { User } from "../models/user";
import { SessionStorageService } from "./session-storage.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  private apiBackoffice: string = environment.apiBackoffice;
  user$: BehaviorSubject<User | null>


  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
      let sessionUser = sessionStorage.getItem('user');
      this.user$ = new BehaviorSubject<User | null>(null);
      this.user$.subscribe((res: User | null) => {
        this.sessionStorage.setItem('user', res);
      })
      
      if (sessionUser) {
        const user = new User(sessionUser.email, 
                              sessionUser.role,
                              sessionUser.status,
                              sessionUser.createdAt, 
                              sessionUser._token, 
                              sessionUser._tokenExpirationDate);
        this.user$.next(user);
      }
    }

  signup(form: User): Observable<Boolean>{
    
    let options: { headers?: HttpHeaders, params?: HttpParams } = {};    
    options['headers'] = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<Boolean>(
      `${this.apiBackoffice}/users/signup`,
      { "backoffice_user": form }  
    )
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    
    let options: { headers?: HttpHeaders, params?: HttpParams } = {};    
      options['headers'] = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    
    return this.http.post<AuthResponseData>(
      `${this.apiBackoffice}/users/login`, 
      { "backoffice_user": { 
          "email": email,
          "password": password
        }  
      }
    )
    .pipe(
      catchError(this.handleError),
      tap((resData: AuthResponseData) => {
      this.handleAuthentication(resData.email, 
                                resData.role, 
                                resData.status,
                                resData.createdAt,
                                resData.authenticationToken, 
                                resData.expiresIn)
      })
    )
  }

  private handleAuthentication(
    email: string,
    role: string,
    status: string,
    createdAt: Date,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, role, status, createdAt, token, expirationDate);
    console.log(user);
    this.user$.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'Une erreur est survenue'
      switch (errorRes?.error?.error) {
        case "Invalid Email or password.":
          errorMessage = "Courriel ou mot de passe invalide"
      }
      return throwError(errorMessage);
  }
}