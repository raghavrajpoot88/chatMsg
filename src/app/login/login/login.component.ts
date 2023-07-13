import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginInfo} from 'src/app/model/userInfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!:FormGroup
  loginList:loginInfo[]=[];
constructor(private service:UserService){}
  ngOnInit(): void {
   this.loginform=new FormGroup({
    Email:new FormControl(null,[Validators.required,Validators.email]),
    Password:new FormControl(null,Validators.required)
   })
  }
  onSubmitLogin(data:loginInfo){
    console.log(this.loginform.value);
    this.service.userLogin(data).subscribe(x=>{
      console.log(x)
      this.loginList=[x]
      console.log(this.loginList);
      
      localStorage.setItem('token',x.token)
      
    })
    
    
    
  }

}
