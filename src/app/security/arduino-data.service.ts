import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ArduinoFirebase } from '../security/Arduino-firebase';

@Injectable({
  providedIn: 'root'
})
export class ArduinoDataService {
  temperatureHistory: any[]=[];
  humidityHistory: any[]=[];
  temperatureCurr: any[]=[];
  humidityCurr: any[]=[];
  constructor(private angularFirestore: AngularFirestore) { }

  //current temperature
  fillCurrTempData(): Promise<any> {
    this.temperatureCurr.length=0;
    return this.getDataFromFirebase("TempCurr")
      .then((ss) => {
          ss.docs.forEach((doc) => {
            this.temperatureCurr.push(doc.data());
          });
        }
      )
      .catch(err => {
        console.log(err);
      });

  }
  getCurrTemp(): any{

    return this.temperatureCurr;
  }

  //current humidity
  fillCurrHumData():  Promise<any>{
    this.humidityCurr.length=0;
    return this.getDataFromFirebase("HumCurr")
      .then((ss) => {
          ss.docs.forEach((doc) => {
            this.humidityCurr.push(doc.data());
          });
        }
      )
      .catch(err => {
        console.log(err);
      });

  }
  getCurrHum(): any{
    return this.humidityCurr;
  }

  //get temperature history data
  fillHistTempData(): Promise<any>{
    this.temperatureHistory.length=0;
    return this.getDataFromFirebase("TempHistory")
      .then((ss) => {
          ss.docs.forEach((doc) => {
            this.temperatureHistory.push(doc.data());
          });
        }
      )
      .catch(err => {
        console.log(err);
      });

  }
  getHistTemp(): any{
    this.temperatureHistory= this.temperatureHistory.sort((t1, t2) => {
      const time1 = Number(t1.timestamp);
      const time2 = Number(t2.timestamp);
      if (time1 > time2) { return 1; }
      if (time1 < time2) { return -1; }
      return 0;
    });
    return this.temperatureHistory;
  }

  //get humidity history data

  fillHistHumData(): Promise<any>{
    this.humidityHistory.length=0;
    return this.getDataFromFirebase("HumHistory")
      .then((ss) => {
          ss.docs.forEach((doc) => {
            this.humidityHistory.push(doc.data());
          });
        }
      )
      .catch(err => {
        console.log(err);
      });

  }
  getHistHum(): any{
    this.humidityHistory= this.humidityHistory.sort((t1, t2) => {
      const time1 = Number(t1.timestamp);
      const time2 = Number(t2.timestamp);
      if (time1 > time2) { return 1; }
      if (time1 < time2) { return -1; }
      return 0;
    });
    return this.humidityHistory;
  }

  //retrieves data from database
  getDataFromFirebase(coll: string):  Promise<any>{
    return this.angularFirestore
      .collection(coll)
      .get().toPromise();
  }

}

