import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { UserFirebase } from '../security/User-firebase';
import { UserService } from '../security/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-form-LogIn',
  templateUrl: './form-LogIn.component.html',
  styleUrls: ['./form-Login.component.scss']
})
export class LogInFormComponent implements OnInit{
  user: UserFirebase = new UserFirebase();
  User: any
  wrongCredentials:boolean;
  LogInForm = new FormGroup({
    username: new FormControl('Username'),
    password: new FormControl('Password'),
  });
  typeInput: string;
  // tslint:disable-next-line:typedef
  get username() { return this.LogInForm.get('username'); }
  // tslint:disable-next-line:typedef
  get password(){return this.LogInForm.get('password'); }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.user.id=this.LogInForm.value.username;
    this.user.password=this.LogInForm.value.password;
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
   this.userService.getUserDoc(this.user.id).then(son => {
       this.User=this.userService.getUser();
       if(this.User) {
         if (this.User.username == this.user.id && this.User.password == this.user.password) {
           this.wrongCredentials = false;
           this.cookieService.set( 'username', this.User.username);
           this.router.navigateByUrl('/ArduinoData');
         } else {
           this.wrongCredentials = true;

         }
       }
       else{
         this.wrongCredentials = true;

       }
     }
   )

  }
  constructor(
    public translate: TranslateService, private userService: UserService, private router: Router, private cookieService: CookieService
  ) {
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('en');
  }



  switchLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit() {

  }
}
