import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserAuth } from "./user-auth";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  myArray: any[] = []
  constructor(private angularFirestore: AngularFirestore) { }
  getUserList() {
    this.angularFirestore
      .collection("Users")
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.myArray.push(doc.data());
        });
      });
    return this.myArray;
  }
  getUserDoc(id) {
    return this.angularFirestore
      .collection('Users')
      .doc(id)
      .valueChanges()
  }

}
