import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { LoginModel, UserRegister } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule, NgClass, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  activeForm: string = "Login";
  registerObj: UserRegister = new UserRegister();
  loginObj: LoginModel = new LoginModel();
  userService = inject(UserService);
  router = inject(Router)
  changeView(formName: string) {
    this.activeForm = formName;
  }

  onRegister() {
    this.userService.registerUser(this.registerObj).subscribe((res: UserRegister) => {
      alert("Account created successfully");
      this.changeView('Login');
    }, error => {
      console.log(error)
    })
  }

  onLogin() {
    this.userService.onLogin(this.loginObj).subscribe((res: any) => {
      sessionStorage.setItem('session', JSON.stringify(true));
      this.router.navigateByUrl("/dashboard")
    }, error => {
      alert("Wrong credentials");
    })
  }
}
