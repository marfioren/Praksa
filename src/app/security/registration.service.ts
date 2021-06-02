import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(public afAuth: AngularFireAuth,
                public router: Router,
                public ngZone: NgZone){}

sendVerificationMail(mail: string, pass:string) :void{
  this.afAuth.createUserWithEmailAndPassword(mail, pass)
    .then((result) => {
      result.user.sendEmailVerification();

    }).catch((error) => {
    window.alert(error.message)
  });
  }
  public setItem(key: string, value: string) :void{
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string{
    return localStorage.getItem(key)
  }
  public removeItem(key:string): void{
    localStorage.removeItem(key);
  }
  public clear(): void{
    localStorage.clear();
  }
}
