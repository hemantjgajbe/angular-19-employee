import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { UserRegister } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [SharedModule, NgClass, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  activeForm: string = "Login";
  registerObj: UserRegister = new UserRegister();
  userService = inject(UserService);

  changeView(formName: string) {
    this.activeForm = formName;
  }

  onRegister() {
    this.userService.registerUser(this.registerObj).subscribe((res: UserRegister) => {
      alert("User registeration")
    }, error => {
      console.log(error)
    })
  }
}
