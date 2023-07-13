import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registration/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:"register", component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"chat", component:UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
