import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleUserRequest, loginInfo, tokens} from 'src/app/model/userInfo';
import { UserListComponent } from 'src/app/user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() token= new EventEmitter(); 
  loginform!:FormGroup
  loginList:loginInfo[]=[];
  // token!:tokens;
  isregistered:boolean=true;
  errorMessage:string="";
  user!: GoogleUserRequest;
  googleUser!:GoogleUserRequest;
  errorMessageGoogle:string='';
  // userListComponent:new UserListComponent;
constructor(private service:UserService, private router :Router ,private authService: SocialAuthService){}
  ngOnInit(): void {
    this.token.emit(this.loginList);

   this.loginform=new FormGroup({
    Email:new FormControl(null,[Validators.required,Validators.email]),
    Password:new FormControl(null,Validators.required)
   })

   this.authService.authState.subscribe(result=>{
    this.user=result;
    console.log(this.user);
    console.log(this.user.idToken);
    
    // this.googleUser.idToken=result.idToken
    this.SignInWithGoolgle()
   })
  }
  
  
  onSubmitLogin(data:loginInfo){
    this.service.userLogin(data).subscribe(x=>{
    console.log(this.loginform.value);
      console.log(x)

      // this.loginList=[x]
      this.token=x.token;
      console.log(this.token);
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

  SignInWithGoolgle():void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() =>{
      // this.googleUser.idToken=this.user.idToken
      this.service.googleLogin(this.user.idToken).subscribe((data)=>{
        console.log("inside signin");
        console.log(data);
        if(data.token){
          this.router.navigate(["/chat"])
        }
        else{
          this.errorMessageGoogle="some error found in signinWithGoogle"
        }
        localStorage.setItem('token',data.token);
        
      })
    // })
  }
  Signout() :any{
    this.authService.signOut();
  }

}
