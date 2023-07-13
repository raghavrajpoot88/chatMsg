import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userInfo } from '../model/userInfo';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // registerform!: FormGroup;
  registerform=this._fb.group({
    Email:[null,[Validators.required,Validators.email]],
    Name:['',Validators.required],
    Password:['',Validators.required],
  })
  constructor(private _fb:FormBuilder, private http:HttpClient,private signUp:RegisterService){}
  // ngOnInIt():void{
  //   this.registerform=this._fb.group({
  //     Email:'',
  //     Name:'',
  //     Password:'',

  //   })
  // }
  get f()
{
    return this._fb.group;
}

  onSubmit():void{
    // data:userInfo
    console.log(this.registerform.value);
    // this.signUp.userRegistration(data);
    
  }
}
