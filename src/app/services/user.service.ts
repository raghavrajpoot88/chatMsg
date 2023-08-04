import { Injectable } from '@angular/core';
import { userMessage, loginInfo, userInfo, sendMessage, editMessage, GoogleUserRequest } from '../model/userInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  userRegistration(data: userInfo):Observable<userInfo>{
    return this.http.post<userInfo>("https://localhost:7174/api/User/register",data);
  }
  userLogin(data:loginInfo):Observable<any>{
    return this.http.post<any>("https://localhost:7174/api/User/login",data);
  }
  googleLogin(googleUser: string):Observable<any>{
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.post<any>("https://localhost:7174/api/User/google",{idToken:googleUser},{headers})
  }
  
  userList():Observable<any>{
    return this.http.get<any>("https://localhost:7174/api/User")
  }
  userMessage(data:string):Observable<any>{
    // data:UserMessage
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.get<any>(`https://localhost:7174/api/MessageInfo?UserId=${data}&count=20&sort=asc`,{headers})
    // https://localhost:7174/api/MessageInfo?UserId=${data.UserId}&before=${data.before}&count=${data.count}&sort=${data.sort}
  }
  
  sendMessage(data:sendMessage):Observable<any>{
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.post<any>("https://localhost:7174/api/MessageInfo/send",data,{headers})
  }

  editMessage(id:string,msgbody:editMessage):Observable<any>{
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.put<any>(`https://localhost:7174/api/MessageInfo/${id}`,msgbody,{headers})
  }

  deleteMessage(id:string){
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.delete<any>(`https://localhost:7174/api/MessageInfo/${id}`,{headers})
  }

  searchMessages(query:string):Observable<any>{
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.get<userMessage>(`https://localhost:7174/api/MessageInfo/search?query=${query}`,{headers})
  }

  requestLogs(){
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    return this.http.get<any>("https://localhost:7174/api/RequestLog",{headers})
  }
}
