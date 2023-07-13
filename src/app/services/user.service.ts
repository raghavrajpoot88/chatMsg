import { Injectable } from '@angular/core';
import { loginInfo, userInfo } from '../model/userInfo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  userRegistration(data: userInfo):Observable<userInfo>{
    return this.http.post<userInfo>("https://localhost:7174/api/Registration/register",data);
  }
  userLogin(data:loginInfo):Observable<loginInfo>{
    return this.http.post<loginInfo>("https://localhost:7174/api/Registration/login",data);
  }
  userList():Observable<any>{
    return this.http.get<any>("https://localhost:7174/api/Registration")
  }
}
