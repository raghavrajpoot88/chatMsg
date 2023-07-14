import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginInfo} from 'src/app/model/userInfo';
import { UserListComponent } from 'src/app/user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!:FormGroup
  loginList:loginInfo[]=[];
  // userListComponent:new UserListComponent;
constructor(private service:UserService){}
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
      
      localStorage.setItem('token',x.token);
      
    },
            // (error: HttpErrorResponse) => {
            //   // Handle error response here
            //   if (error.status === 400) {
            //     // Display an error message to the user
            //reister=false
            //     console.log('User does not exist.');
            //   } else {
            //     // Handle other error scenarios
            //     console.log('An error occurred:', error.error);
            //   }
            // }
          )
          
          
          
        }

}
