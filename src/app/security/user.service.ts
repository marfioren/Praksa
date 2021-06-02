import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserFirebase } from '../security/User-firebase';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any[]=[];
  user: any
  constructor(private angularFirestore: AngularFirestore) { }

  //all users
  getUserList(): Promise<any> {
    this.users.length=0;
    return this.getDataFromFirebase()
          .then((ss) => {
            ss.docs.forEach((doc) => {
              this.users.push(doc.data());
            });
          }
          )
          .catch(err => {
              console.log(err);
            });

      }
  getDataFromFirebase(): Promise<any>{
    return this.angularFirestore
      .collection("Users")
      .get().toPromise();
  }
  getArray():any{
    return this.users;
  }


  //one userFirebase
  getUserDoc(id): Promise<any> {
   return this.getUserFromFirebase(id)
     .then((ss) => {
         this.user=ss.data();
       }
       )
     .catch(err => {
       console.log(err);
     });
  }
  getUserFromFirebase(id): Promise<any>{
    return this.angularFirestore
      .collection('Users')
      .doc(id)
      .get().toPromise();
  }
  getUser(): any{
    return this.user;
  }

  //create userFirebase
  createUser(user: UserFirebase): Promise<any> {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("Users")
        .doc(user.id)
        .set({
          isAuthenticated: user.isAuthenticated,
          isMailConfirmed: user.isMailConfirmed,
          mail:user.mail,
          password: user.password,
          username: user.id
        })
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

}
