import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { UserAuth } from '../security/user-auth';
import { User } from '../security/users';
import { SecurityService } from '../security/security.service';
@Component({
  selector: 'app-form-LogIn',
  templateUrl: './form-LogIn.component.html',
  styleUrls: ['./form-Login.component.scss']
})
export class LogInFormComponent{

  user: User = new User();
  securityObject: UserAuth = null;

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
    this.user.Username=this.LogInForm.value.username;
    this.user.Password=this.LogInForm.value.password;
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
    this.securityService.login(this.user).subscribe(resp => {
      this.securityObject = resp;
    });
  }
  constructor(
    public translate: TranslateService, private securityService: SecurityService
  ) {
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('en');
  }



  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
