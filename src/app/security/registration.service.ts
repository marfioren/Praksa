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

SendVerificationMail(mail: string, pass:string) {
  this.afAuth.createUserWithEmailAndPassword(mail, pass)
    .then((result) => {
      result.user.sendEmailVerification();

    }).catch((error) => {
    window.alert(error.message)
  });
  }
  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getItem(key: string){
    return localStorage.getItem(key)
  }
  public removeItem(key:string) {
    localStorage.removeItem(key);
  }
  public clear(){
    localStorage.clear();
  }
}
