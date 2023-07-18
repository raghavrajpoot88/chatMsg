import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginInfo} from 'src/app/model/userInfo';
import { UserListComponent } from 'src/app/user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!:FormGroup
  loginList:loginInfo[]=[];
  isregistered:boolean=true;
  errorMessage:string="";
  // userListComponent:new UserListComponent;
constructor(private service:UserService, private router :Router){}
  ngOnInit(): void {
    
   this.loginform=new FormGroup({
    Email:new FormControl(null,[Validators.required,Validators.email]),
    Password:new FormControl(null,Validators.required)
   })
  }
  onSubmitLogin(data:loginInfo){
    this.service.userLogin(data).subscribe(x=>{
    console.log(this.loginform.value);
      console.log(x)
      this.loginList=[x]
      console.log(this.loginList);
      if(this.loginform.valid){
        this.router.navigate(["/chat"])
      }
      // console.log(this.loginform.get('Email')?.value);
      
      localStorage.setItem('token',x.token);
      
    },
    ( e: any) => {
      // Handle error response here
      if (e.status === 400 ) {
        // Display an error message to the user
      this.isregistered=false
        this.errorMessage=e.error;
        console.log(this.errorMessage);
        console.log(e.error);
      } else {
        // Handle other error scenarios
        console.log('An error occurred:', e);
      }
    }
    )
    
    
    
  }

}
