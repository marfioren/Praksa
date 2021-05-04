import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UserAuth } from './user-auth';
import { User } from './users';
import { LOGIN_MOCKS } from './test-users';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: UserAuth = new UserAuth();
  resetSecurityObject(): void {
    this.securityObject.Username = "";
    this.securityObject.Password = "";
    this.securityObject.isAuthenticated = false;
    localStorage.removeItem("Password");
  }

  login(entity: User): Observable<UserAuth> {

    this.resetSecurityObject();
    Object.assign(this.securityObject, LOGIN_MOCKS.find(user => user.Username === entity.Username && user.Password === entity.Password));
    if (this.securityObject.Username !== "") {
      console.log('Ulogiran korisnik');
      localStorage.setItem("Password", this.securityObject.Password);
    }
    return of<UserAuth>(this.securityObject);
  }

  logout(): void {
    this.resetSecurityObject();
  }
  constructor() { }
}
