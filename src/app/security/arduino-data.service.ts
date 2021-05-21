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

  //current humidity
  fillCurrHumData() {
    this.HumidityCurr.length=0;
    return this.getDataFromFirebase("HumCurr")
      .then((ss) => {
          ss.docs.forEach((doc) => {
            this.HumidityCurr.push(doc.data());
          });
        }
      )
      .catch(err => {
        console.log(err);
      });

  }
  getCurrHum(){
    return this.HumidityCurr;
  }

  //get temperature history data
  fillHistTempData() {
    this.TemperatureHistory.length=0;
    return this.getDataFromFirebase("TempHistory")
      .then((ss) => {
          ss.docs.forEach((doc) => {
            this.TemperatureHistory.push(doc.data());
          });
        }
      )
      .catch(err => {
        console.log(err);
      });

  }
  getHistTemp(){
    this.TemperatureHistory= this.TemperatureHistory.sort((t1, t2) => {
      const time1 = Number(t1.timestamp);
      const time2 = Number(t2.timestamp);
      if (time1 > time2) { return 1; }
      if (time1 < time2) { return -1; }
      return 0;
    });
    return this.TemperatureHistory;
  }
  //retrieves data from database
  getDataFromFirebase(coll: string){
    return this.angularFirestore
      .collection(coll)
      .get().toPromise();
  }

}

