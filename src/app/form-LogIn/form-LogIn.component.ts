import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { UserFirebase } from '../security/User-firebase';
import { UserService } from '../security/user.service';
@Component({
  selector: 'app-form-LogIn',
  templateUrl: './form-LogIn.component.html',
  styleUrls: ['./form-Login.component.scss']
})
export class LogInFormComponent{
  user: UserFirebase = new UserFirebase();
  User: any
  LogInForm = new FormGroup({
    username: new FormControl('Username',[Validators.required, Validators.minLength(7)]),
    password: new FormControl('Password', [Validators.required, Validators.minLength(8)]),
  });
  typeInput: string;
  // tslint:disable-next-line:typedef
  get username() { return this.LogInForm.get('username'); }
  // tslint:disable-next-line:typedef
  get password(){return this.LogInForm.get('password'); }
  // tslint:disable-next-line:typedef
  onSubmit() {
    //this.user.id=this.LogInForm.value.username;
    //this.user.password=this.LogInForm.value.password;
    this.login();
  }
  // tslint:disable-next-line:typedef
  onFocusEventUser(event: any){
    this.LogInForm.get('username').reset('');
  }
  // tslint:disable-next-line:typedef
  onFocusEventPass(event: any){
    this.LogInForm.get('password').reset('');
    this.typeInput = 'password';
  }
  login() {
   this.userService.getUserDoc("user1").then(son => {
       this.User=this.userService.getUser();

     }
   )
   console.log(this.user.id);
  }
  constructor(
    public translate: TranslateService, private userService: UserService
  ) {
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('en');
  }



  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
