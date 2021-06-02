import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
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
  userFirebase: UserFirebase={  id: "",
                        isAuthenticated: false,
                        isMailConfirmed: false,
                        mail:"",
                        password: ""};
  user: any
  wrongCredentials:boolean;
  logInForm = new FormGroup({
    username: new FormControl('Username'),
    password: new FormControl('Password'),
  });
  typeInput: string;
  // tslint:disable-next-line:typedef
  get username(): AbstractControl{ return this.logInForm.get('username'); }
  // tslint:disable-next-line:typedef
  get password(): AbstractControl{return this.logInForm.get('password'); }
  // tslint:disable-next-line:typedef
  onSubmit(): void{
    this.userFirebase.id=this.logInForm.value.username;
    this.userFirebase.password=this.logInForm.value.password;
    this.login();
  }
  // tslint:disable-next-line:typedef
  onFocusEventUser(event: any): void{
    this.logInForm.get('username').reset('');
  }
  // tslint:disable-next-line:typedef
  onFocusEventPass(event: any): void{
    this.logInForm.get('password').reset('');
    this.typeInput = 'password';
  }
  login(): void{
   this.userService.getUserDoc(this.userFirebase.id).then(son => {
       this.user=this.userService.getUser();
       if(this.user) {
         if (this.user.username == this.userFirebase.id && this.user.password == this.userFirebase.password) {
           this.wrongCredentials = false;
           this.cookieService.set( 'username', this.user.username);
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



  switchLang(lang: string): void{
    this.translate.use(lang);
  }
  ngOnInit() {

  }
}
