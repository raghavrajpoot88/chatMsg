import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { userMessage, userList,sendMessage } from '../model/userInfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  list:userList[]=[];
  msgList:userMessage[]=[];
  
  messageform!:FormGroup
  constructor(private service:UserService ){}
  ngOnInit(): void {
    this.getList();
    this.messageform=new FormGroup({
      Message:new FormControl(null,Validators.required)
    })

  }
  onSubmitMessage(content:string,msgList:userMessage[]){
    if (msgList.length > 0) {
      const receiverId = msgList[0].receiverId; // Accessing receiverId of the first element
    this.service.sendMessage(content,receiverId).subscribe(result=>
      console.log(result)
      )}
  }
  getList(){
    this.service.userList().subscribe(list=>{
      console.log(list);
      this.list=list;
      // console.log(this.list[2].name);
      
    })
    
  }
  getMessage(data:userList){
    this.service.userMessage(data.userId).subscribe(result=>{
      this.msgList=result,
      console.log(result);
      
      console.log(data.name);
    })
  }
  

 
  

}
