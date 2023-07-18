import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userInfo } from '../../model/userInfo';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerform!: FormGroup;
  // registerform=this._fb.group({
  //   Email:[null,[Validators.required,Validators.email]],
  //   Name:['',Validators.required],
  //   Password:['',Validators.required],
  // })
  constructor(private _fb:FormBuilder, private http:HttpClient,private signUp:UserService, private router:Router){}
  ngOnInit(): void {
    this.registerform=new FormGroup({
      Email:new FormControl(null,[Validators.email,Validators.required]) ,
      Name:new FormControl(null,[Validators.required,Validators.minLength(5)]) ,
      Password:new FormControl(null,[Validators.required,Validators.minLength(8)]) 
      // ,Validators.pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,}))"))
    })
  }
  onSubmit(data:userInfo):void{
    console.log(this.registerform.value);
    this.signUp.userRegistration(data).subscribe(x=>{
      console.log(x)
      if(this.registerform.valid){
        this.router.navigate(["/login"])
      }
      

    },
    (error)=>{
      if (error.status === 400) {
      // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
    }
      );

    
  }
}
