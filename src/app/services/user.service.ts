import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http:HttpClient;
  private URL:string = "https://localhost:5001/api/";

  constructor(private handler:HttpBackend) {this.http = new HttpClient(handler); }

  checkLogin(username: string,password: string):Observable<any>{    
    return this.http.get<any>("https://localhost:5021/Ocelot/Test");
  }

  getToken(username : string,password: string):Observable<any>{
    return this.http.post<any>("https://localhost:5021/Ocelot/GetToken",
    {"name":username,"password":password});
  }

  refreshToken(user_name:string,jwt_token:string,refresh_token:string):Observable<any>{
    return this.http.post<any>('https://localhost:5021/Ocelot/GetRefreshToken',
    {"user_name":user_name,"jwt_token":jwt_token,"refresh_token":refresh_token});
  }

}
