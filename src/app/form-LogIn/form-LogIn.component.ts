import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-form-LogIn',
  templateUrl: './form-LogIn.component.html',
  styleUrls: ['./form-LogIn.component.css']
})
export class LogInFormComponent {
  LogInForm = new FormGroup({
    username: new FormControl('Username', [Validators.required, Validators.minLength(7)]),
    password: new FormControl('Password', [Validators.required, Validators.minLength(8)]),
  });
  typeInput: string;
  // tslint:disable-next-line:typedef
  get username() { return this.LogInForm.get('username'); }
  // tslint:disable-next-line:typedef
  get password(){return this.LogInForm.get('password'); }
  // tslint:disable-next-line:typedef
  onSubmit() {
    console.warn(this.LogInForm.value);
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
}
