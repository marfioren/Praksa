import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { UserAuth } from '../security/user-auth';
import { UserFirebase } from '../security/User-firebase';
import { RegistrationService } from '../security/registration.service';
import { UserService } from '../security/user.service';
@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent{
  user: UserAuth = new UserAuth();
  securityObject: UserAuth = null;
  myArray: any[] = []
  RegistrationForm = new FormGroup({
    username: new FormControl('Username',[Validators.required, Validators.minLength(7)]),
    password: new FormControl('Password', [Validators.required, Validators.minLength(8)]),
    confPassword: new FormControl('Confirm password', [Validators.required]),
    mail: new FormControl('mail@mail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  }
  );
  typeInput: string;
  wrongPass: boolean;
  // tslint:disable-next-line:typedef
  get username() { return this.RegistrationForm.get('username'); }
  // tslint:disable-next-line:typedef
  get password(){return this.RegistrationForm.get('password'); }

  get confPassword(){return this.RegistrationForm.get('confPassword'); }

  get mail(){return this.RegistrationForm.get('mail'); }

  checkPass(pass: string, confPass: string):boolean{
      if (pass !== confPass) {
       return true;
      } else {
        return false;
      }
  }

  onSubmit() {
    this.getData();
    if(!this.wrongPass) {
      this.user.Username = this.RegistrationForm.value.username;
      this.user.Mail = this.RegistrationForm.value.mail;
      this.user.Password = this.RegistrationForm.value.password;
    }
  }
  // tslint:disable-next-line:typedef
  onFocusEventUser(event: any){
    this.RegistrationForm.get('username').reset('');
  }
  // tslint:disable-next-line:typedef
  onFocusEventMail(event: any){
    this.RegistrationForm.get('mail').reset('');
  }
  // tslint:disable-next-line:typedef
  onFocusEventPass(event: any){
    this.RegistrationForm.get('confPassword').reset('');
    this.RegistrationForm.get('password').reset('');
    this.typeInput = 'password';
  }
  onFocusEventConfPass(event: any){
    this.wrongPass=this.checkPass(this.RegistrationForm.value.password, this.RegistrationForm.value.confPassword);
    console.log(this.wrongPass);
    this.typeInput = 'password';
  }
  onKeypressEvent(event: any){
    this.wrongPass=this.checkPass(this.RegistrationForm.value.password, this.RegistrationForm.value.confPassword);
    console.log(this.wrongPass);

  }
  registration() {
   this.registrationService.setItem(this.user.Username, JSON.stringify(this.user))
    this.registrationService.SendVerificationMail(this.user.Mail, this.user.Password);

  }
  getData(){
    this.myArray=this.userService.getUserList();
    console.log(this.myArray);
  }
  constructor(
    public translate: TranslateService, private registrationService: RegistrationService, private userService: UserService
  ) {
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('en');
  }



  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
