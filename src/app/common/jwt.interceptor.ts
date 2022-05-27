import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private service:UserService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    var jwt_token = localStorage.getItem("jwt_token");
    var user_name = localStorage.getItem("user_name");
    var refresh_token = localStorage.getItem("refresh_token");

    var new_request = request.clone({
      setHeaders:{
        "Authorization": 'Bearer ' + jwt_token
      }
    });
    return next.handle(new_request).pipe(catchError(err => {
      console.log("JWT Authorization failed. Trying to refresh the Token.!");
      var second_req = new_request;

      if(err instanceof HttpErrorResponse){
        console.log("Inside HttpErrorResponse Handler");
        console.log(err.status);
        if(err.status === 401 || err.status ===0){
          console.log("Refreshing JWT token using Refresh Token");
          console.log(user_name + ' [' + jwt_token + '] [' + refresh_token + ']');
          
          return this.service.refreshToken(user_name!,jwt_token!,refresh_token!).pipe(
            switchMap((result:any) =>{
            console.log("Refresh Token :");
            console.log(result);

            localStorage.setItem("jwt_token",result.jwt_token);
            localStorage.setItem("user_name",result.user_name);
            localStorage.setItem("refresh_token",result.refresh_token);

            second_req = request.clone({
              setHeaders:{
                "Authorization": 'Bearer ' + result.jwt_token
              }
                      
            });

            return next.handle(second_req);  
          }),catchError((err) => {
            console.log("Refresh token expired too. Redirecting to Sign In")
            this.router.navigate(['']);
            return throwError(err);
          })
        )}
      }
      this.router.navigate(['']);
      return next.handle(second_req);

    }));
  }
}
