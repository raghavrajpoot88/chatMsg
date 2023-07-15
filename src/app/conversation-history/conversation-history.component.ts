import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.css']
})
export class ConversationHistoryComponent implements OnInit{
  constructor(private service:UserService){

  }
  ngOnInit(): void {
    this.messageInfo();
  }
  messageInfo(){
    // this.service.userMessage().subscribe(result=>
      // console.log(result)
      // )
  }

}
