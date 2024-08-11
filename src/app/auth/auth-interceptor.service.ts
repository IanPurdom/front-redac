import { Injectable } from "@angular/core";
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http"; 
import { AuthService } from "../services/auth.service";
import { exhaustMap, take } from "rxjs/operators";
import { User } from "../models/user";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap((user: User | null) => {
        if(!user){
          return next.handle(req)
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders({
            "Content-type": "application/json",
            'X-BACKOFFICE-USER-TOKEN': user.token ? user.token :  ""
          })
        });
        return next.handle(modifiedReq);
      })
    );
  }
}