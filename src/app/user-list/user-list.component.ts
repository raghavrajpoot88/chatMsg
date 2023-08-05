import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';

import { userMessage, userList,sendMessage, editMessage, logs, loginInfo, tokens } from '../model/userInfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild('bottomOfPage', { static: true }) bottomOfPageRef!: ElementRef;
  
  list:userList[]=[];
  msgList:userMessage[]=[];
  sentmessage:userMessage|null=null;
  searchData:userMessage[]=[];
  data:sendMessage = { ReceiverId: "", MsgBody: "" };

  editDeleteMessage:string="";
  isUserMessage:Boolean=true;
  nameOfReceiver:string='';
  tt !:string ;
  
  messageform!:FormGroup
  editform!:FormGroup
  searchform!:FormGroup

  private _hubConnection!: HubConnection
  public connectionId!: string;
  constructor(private service:UserService , private router:Router){}
  ngOnInit(): void {
    this.getList();
    this.messageform=new FormGroup({
      MsgBody:new FormControl(null,Validators.required)
    })
    this.editform=new FormGroup({
      content:new FormControl(null,Validators.required)    
    })
    console.log(this.editform.value);
    this.searchform=new FormGroup({
      query:new FormControl(null ,Validators.required)
    })
    this.tt = localStorage.getItem('token')!;
    //?Real-time implementation
    let headers=new HttpHeaders()
    .set("Authorization",`bearer ${localStorage.getItem('token')}`)
    this._hubConnection=new HubConnectionBuilder().withUrl('https://localhost:7174/hub',{ accessTokenFactory: () => this.tt }).build();
    // ,{ accessTokenFactory: () => this.token }
    this._hubConnection.start()
    .then(()=>
      console.log("Realtime connection started"))
    // .then(()=>this.getConnectionId())
    .catch(error=>{
      console.log("Erroring occuring at connection establishment")
    });

    this._hubConnection.on('ReceiveMessage',(data:userMessage)=>{
      this.msgList.push(data);
      console.log(data);
      console.log(this.msgList);
    })
    //   private getConnectionId = () => {
    //   this._hubConnection.invoke('getconnectionid')
    //   .then((data) => {
    //     console.log(data);
    //     this.connectionId = data;
    //   });
    // }
    

  }
  // getConnectionId = () => {
  //     this._hubConnection.invoke('GetConnectionId')
  //     .then((data) => {
  //       console.log(data);
  //       this.connectionId = data;
  //     });
  //   }

  sendMessage(){
      // this.data.ReceiverId = msgList[0].receiverId; // Accessing receiverId of the first element
      this.data.MsgBody=this.messageform.get('MsgBody')?.value;
      console.log(this.data);
      // this._hubConnection.invoke('NewMessage', this.data.ReceiverId, message);
      this.service.sendMessage(this.data).subscribe((result:userMessage)=>{
        console.log(result);
        
        this.msgList.push(result);
        if (this.msgList.length > 20) {
          this.msgList.splice(0, this.msgList.length - 20);
        }
        console.log(this.msgList); 
        
        //! this._hubConnection.invoke('ReceiveMessage',this.connectionId, result);
        this._hubConnection.invoke('NewMessage', result);

        this.messageform.reset();
        this.scrollToBottom();
      })
  }
  private scrollToBottom() {
    if (this.bottomOfPageRef && this.bottomOfPageRef.nativeElement) {
      this.bottomOfPageRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    console.log("Scrolling to the bottom");
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
    this.isUserMessage=true;
    this.service.userMessage(data.id).subscribe(result=>{
      this.msgList=result;
      this.data.ReceiverId=data.id
      
      console.log(result);
      this.nameOfReceiver=data.userName;
      console.log(data.userName);
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
      this.msgList[editedMsgIndex].msgBody = editMessageValue.content;
      this.msgList = [...this.msgList];
      console.log(editMessageValue.content);
      
    }
    
    }
      )
  } 
  DeleteMessage(msgId:string){
    this.service.deleteMessage(this.editDeleteMessage).subscribe(result=>{
      console.log(result)
      this.msgList = this.msgList.filter(msg => msg.msgId !== msgId);
    })
  }
  searchMessage(query:string){
      this.isUserMessage = false;
      this.service.searchMessages(query).subscribe((result:any) =>{
      console.log(result)
      this.searchData=result
      console.log(this.searchData);
      

      
    })
  }
  shiftToSearch(){
    // if (this.searchform.dirty && this.searchform.touched && this.searchform.invalid) {
      this.isUserMessage = true;
    // }

  }
  NavigateToLog(){
    this.router.navigate(['/log']);
  }
  


  handleFormClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  

 
  

}
