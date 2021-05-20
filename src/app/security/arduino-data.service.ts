import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArduinoFirebase } from '../security/Arduino-firebase';
@Injectable({
  providedIn: 'root'
})
export class ArduinoDataService {
  TemperatureHistory: any[]=[];
  HumidityHistory: any[]=[];
  TemperatureCurr: any[]=[];
  HumidityCurr: any[]=[];
  constructor(private angularFirestore: AngularFirestore) { }

  //current temperature
  fillCurrTempData() {
    this.TemperatureCurr.length=0;
    return this.getDataFromFirebase("TempCurr")
      .then((ss) => {
          ss.docs.forEach((doc) => {
            this.TemperatureCurr.push(doc.data());
          });
        }
      )
      .catch(err => {
        console.log(err);
      });

  }
  getCurrTemp(){
    return this.TemperatureCurr;
  }
  getDataFromFirebase(coll: string){
    return this.angularFirestore
      .collection(coll)
      .get().toPromise();
  }

}

