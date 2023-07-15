import { Injectable } from '@angular/core';
import { userMessage, loginInfo, userInfo } from '../model/userInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  userMessage(data:string):Observable<any>{
    // data:UserMessage
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.get<any>(`https://localhost:7174/api/MessageInfo?UserId=${data}&count=20&sort=asc`,{headers})
    // https://localhost:7174/api/MessageInfo?UserId=${data.UserId}&before=${data.before}&count=${data.count}&sort=${data.sort}
  }
  sendMessage(data:string,receiverId:string){
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.post<string>("https://localhost:7174/api/MessageInfo",{receiverId,data},{headers})
  }
}
