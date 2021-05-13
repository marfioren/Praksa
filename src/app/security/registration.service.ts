import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UserAuth } from './user-auth';
import { LOGIN_MOCKS } from './test-users';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor() { }
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
