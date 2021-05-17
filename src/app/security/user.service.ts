import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserFirebase } from '../security/User-firebase';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  Users: any[]=[];
  User: any
  constructor(private angularFirestore: AngularFirestore) { }

  //all users
  getUserList() {
    this.Users.length=0;
    return this.getDataFromFirebase()
          .then((ss) => {
            ss.docs.forEach((doc) => {
              this.Users.push(doc.data());
            });
          }
          )
          .catch(err => {
              console.log(err);
            });

      }
  getDataFromFirebase(){
    return this.angularFirestore
      .collection("Users")
      .get().toPromise();
  }
  getArray(){
    return this.Users;
  }


  //one user
  getUserDoc(id) {
   return this.getUserFromFirebase(id)
     .then((ss) => {
         this.User=ss.data();
       }
       )
     .catch(err => {
       console.log(err);
     });
  }
  getUserFromFirebase(id){
    return this.angularFirestore
      .collection('Users')
      .doc(id)
      .get().toPromise();
  }
  getUser(){
    return this.User;
  }

  //create user
  createUser(user: UserFirebase) {
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
