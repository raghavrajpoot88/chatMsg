import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userInfo } from '../../model/userInfo';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';


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
  constructor(private _fb:FormBuilder, private http:HttpClient,private signUp:UserService){}
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
    this.signUp.userRegistration(data).subscribe(x=>
      console.log(x)
      )
    
  }
}
