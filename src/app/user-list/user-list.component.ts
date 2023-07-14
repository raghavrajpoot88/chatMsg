import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { userList } from '../model/userInfo';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  list:userList[]=[];
  constructor(private service:UserService ){}
  ngOnInit(): void {
    this.getList();
  }
  getList(){
    this.service.userList().subscribe(list=>{
      console.log(list);
      this.list=list;
      // console.log(this.list[2].name);
      
    })
  }
  

}
