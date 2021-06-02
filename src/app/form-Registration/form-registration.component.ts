import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { UserFirebase } from '../security/User-firebase';
import { RegistrationService } from '../security/registration.service';
import { UserService } from '../security/user.service';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit {
  user: UserFirebase={  id: "",
                        isAuthenticated: false,
                        isMailConfirmed: false,
                        mail:"",
                        password: ""};
  typeInput: string;
  click=[false, false, false, false];
  wrongPass: boolean;
  usedUsername: boolean;
  myArray: any[];
  users: string[]=[];
  registrationForm = new FormGroup({
    username: new FormControl('Username',[Validators.required, Validators.minLength(7)]),
    password: new FormControl('Password', [Validators.required, Validators.minLength(8)]),
    confPassword: new FormControl('Confirm password', [Validators.required]),
    mail: new FormControl('mail@mail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  }
  );

  // tslint:disable-next-line:typedef
  get username(): AbstractControl{ return this.registrationForm.get('username'); }
  // tslint:disable-next-line:typedef
  get password(): AbstractControl{return this.registrationForm.get('password'); }

  get confPassword(): AbstractControl{return this.registrationForm.get('confPassword'); }

  get mail(){return this.registrationForm.get('mail'); }

  checkPass(pass: string, confPass: string): boolean{
      if (pass !== confPass) {
       return true;
      } else {
        return false;
      }
  }

  checkUsername(username:string): boolean{
    if(this.users.includes(username)){
      return true;
    }
    else{
      return false;
    }
  }

  onSubmit(): void  {
    if(!this.wrongPass&&!this.usedUsername) {
      this.user.id = this.registrationForm.value.username;
      this.user.mail = this.registrationForm.value.mail;
      this.user.password = this.registrationForm.value.password;
      this.user.isAuthenticated=false;
      this.user.isMailConfirmed=false;
      this.registration();
      localStorage.clear();
    }
  }
  // tslint:disable-next-line:typedef
  onFocusEventUser(event: any): void {
    this.registrationForm.get('username').reset('');
    this.click[0]=true;
  }
  // tslint:disable-next-line:typedef
  onFocusEventMail(event: any): void {
    this.registrationForm.get('mail').reset('');
    this.click[1]=true;
  }
  // tslint:disable-next-line:typedef
  onFocusEventPass(event: any): void {
    this.registrationForm.get('confPassword').reset('');
    this.registrationForm.get('password').reset('');
    this.typeInput = 'password';
    this.click[2]=true;
  }
  onFocusEventConfPass(event: any): void {
    this.wrongPass=this.checkPass(this.registrationForm.value.password, this.registrationForm.value.confPassword);
    this.typeInput = 'password';
    this.click[3]=true;
  }
  onKeypressEventPass(event: any): void {
    this.wrongPass=this.checkPass(this.registrationForm.value.password, this.registrationForm.value.confPassword);
  }
  onKeypressEventUser(event: any): void {
    this.usedUsername=this.checkUsername(this.registrationForm.value.username);
  }
  registration(): void {
   this.userService.createUser(this.user);
   this.router.navigateByUrl('/LogIn');
   // this.registrationService.sendVerificationMail(this.userFirebase.Mail, this.userFirebase.Password);

  }
  getData(): void{

    this.userService.getUserList().then(son => {
      this.myArray=this.userService.getArray();
      var iterator= this.myArray.values();
      for(let i of iterator){
        this.users.push(i.username);
      }
    }
    )

  }
  switchLang(lang: string): void{
    this.translate.use(lang);
  }
  ngOnInit(): void{
    this.getData();
  }
  constructor(
    public translate: TranslateService, private registrationService: RegistrationService, private userService: UserService, private router: Router
  ) {
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('en');
  }


}
