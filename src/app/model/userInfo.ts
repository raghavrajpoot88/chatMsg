import { Expansion } from "@angular/compiler";

export interface userInfo
{
    Email:string|null,
    Name:string|null,
    Password:string|null,
}
export interface loginInfo{
    Email:string,
    Password:string,
    token:any,
}
export interface userList{
    userId: string,
    email: string,
    name: string,
    passwordHash: string,
    passwordSalt: string,
}
export interface userMessage{
    
    msgId: string,
    userId:string,
    receiverId: string,
    msgBody: string,
    timeStamp: string,
  
}
export interface sendMessage{
    ReceiverId:string,
    MsgBody:string,
}
export interface editMessage{
    content:string;
}