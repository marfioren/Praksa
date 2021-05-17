import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { UserFirebase } from '../security/User-firebase';
import { RegistrationService } from '../security/registration.service';
import { UserService } from '../security/user.service';
@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit {
  user: UserFirebase= new UserFirebase();
  typeInput: string;
  click=[false, false, false, false];
  wrongPass: boolean;
  usedUsername: boolean;
  myArray: any[];
  Users: string[]=[];
  RegistrationForm = new FormGroup({
    username: new FormControl('Username',[Validators.required, Validators.minLength(7)]),
    password: new FormControl('Password', [Validators.required, Validators.minLength(8)]),
    confPassword: new FormControl('Confirm password', [Validators.required]),
    mail: new FormControl('mail@mail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  }
  );

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

  checkUsername(username:string){
    if(this.Users.includes(username)){
      return true;
    }
    else{
      return false;
    }
  }

  onSubmit() {
    if(!this.wrongPass&&!this.usedUsername) {
      this.user.id = this.RegistrationForm.value.username;
      this.user.mail = this.RegistrationForm.value.mail;
      this.user.password = this.RegistrationForm.value.password;
      this.user.isAuthenticated=false;
      this.user.isMailConfirmed=false;
      this.registration();
      localStorage.clear();
    }
  }
  // tslint:disable-next-line:typedef
  onFocusEventUser(event: any){
    this.RegistrationForm.get('username').reset('');
    this.click[0]=true;
  }
  // tslint:disable-next-line:typedef
  onFocusEventMail(event: any){
    this.RegistrationForm.get('mail').reset('');
    this.click[1]=true;
  }
  // tslint:disable-next-line:typedef
  onFocusEventPass(event: any){
    this.RegistrationForm.get('confPassword').reset('');
    this.RegistrationForm.get('password').reset('');
    this.typeInput = 'password';
    this.click[2]=true;
  }
  onFocusEventConfPass(event: any){
    this.wrongPass=this.checkPass(this.RegistrationForm.value.password, this.RegistrationForm.value.confPassword);
    this.typeInput = 'password';
    this.click[3]=true;
  }
  onKeypressEventPass(event: any){
    this.wrongPass=this.checkPass(this.RegistrationForm.value.password, this.RegistrationForm.value.confPassword);
  }
  onKeypressEventUser(event: any){
    this.usedUsername=this.checkUsername(this.RegistrationForm.value.username);
  }
  registration() {
   this.userService.createUser(this.user);
   // this.registrationService.SendVerificationMail(this.user.Mail, this.user.Password);

  }
  getData(){

    this.userService.getUserList().then(son => {
      this.myArray=this.userService.getArray();
      var iterator= this.myArray.values();
      for(let i of iterator){
        this.Users.push(i.username);
      }
    }
    )

  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit() {
    this.getData();
  }
  constructor(
    public translate: TranslateService, private registrationService: RegistrationService, private userService: UserService
  ) {
    translate.addLangs(['en', 'hr']);
    translate.setDefaultLang('en');
  }


}
