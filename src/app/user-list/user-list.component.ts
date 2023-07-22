import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

import { userMessage, userList,sendMessage, editMessage } from '../model/userInfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  list:userList[]=[];
  msgList:userMessage[]=[];
  sentmessage:userMessage|null=null
  data:sendMessage = { ReceiverId: "", MsgBody: "" };

  editDeleteMessage:string="";
  isUserMessage:Boolean=true;
  nameOfReceiver:string='';
  
  messageform!:FormGroup
  editform!:FormGroup
  constructor(private service:UserService ){}
  ngOnInit(): void {
    this.getList();
    this.messageform=new FormGroup({
      MsgBody:new FormControl(null,Validators.required)
    })
    this.editform=new FormGroup({
      content:new FormControl(null,Validators.required)    
    })
    console.log(this.editform.value);
    

  }
  sendMessage(){
      // this.data.ReceiverId = msgList[0].receiverId; // Accessing receiverId of the first element
      this.data.MsgBody=this.messageform.get('MsgBody')?.value;
      console.log(this.data);
      
      this.service.sendMessage(this.data).subscribe(result=>{
        console.log(result)
        this.sentmessage=result;
      })
  }
  getList(){
    this.service.userList().subscribe(list=>{
      console.log(list);
      this.list=list;
      // console.log(this.list[2].name);
      
    })
    
  }
  getMessage(data:userList){
    // this.data.ReceiverId=data.userId;
    this.service.userMessage(data.userId).subscribe(result=>{
      this.msgList=result;
      this.data.ReceiverId=data.userId
      
      console.log(result);
      this.nameOfReceiver=data.name;
      console.log(data.name);
      this.sentmessage=null;
    })
    // if(this.msgList.length===0){
    //   this.isUserMessage=false;
    // }
  }
   // we create an object that contains coordinates
   menuTopLeftPosition =  {x: 0, y: 0}

   // reference to the MatMenuTrigger in the DOM
   @ViewChild(MatMenuTrigger, {static: true}) 
   matMenuTrigger!: MatMenuTrigger;

   onRightClick(event: MouseEvent, item: any) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();
    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX;
    this.menuTopLeftPosition.y = event.clientY;
    // we open the menu
    // we pass to the menu the information about our object
    this.matMenuTrigger.menuData = {item: item}
    this.editDeleteMessage=item.msgId;
    console.log(this.editDeleteMessage);
    
    // we open the menu
    this.matMenuTrigger.openMenu();

  }
  EditMessage(msgId:string,content:string){
    // this.editMessageValue=this.editform.get('EditMsgBody')?.value;
    // console.log(this.editform.get('content')?.value);
    const editMessageValue: editMessage = { content: content };
    console.log(editMessageValue);
    
    
    this.service.editMessage(msgId, editMessageValue).subscribe(result=>{
      console.log(result)
      const editedMsgIndex = this.msgList.findIndex(msg => msg.msgId === msgId);
      if (editedMsgIndex !== -1) {
      this.msgList[editedMsgIndex].msgBody = result.content;
      this.msgList = [...this.msgList];
    }
    
    }
      )
  } 
  DeleteMessage(msgId:string){
    this.service.deleteMessage(this.editDeleteMessage).subscribe(result=>{
      console.log(result)
      this.msgList = this.msgList.filter(msg => msg.msgId !== msgId);

    }
     )
  }
  handleFormClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  

 
  

}
