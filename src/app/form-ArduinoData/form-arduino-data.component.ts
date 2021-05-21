import { Component, OnInit } from '@angular/core';
import { ArduinoFirebase } from '../security/Arduino-firebase';
import { ArduinoDataService } from '../security/arduino-data.service';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-form-arduino-data',
  templateUrl: './form-arduino-data.component.html',
  styleUrls: ['./form-arduino-data.component.css']
})
export class FormArduinoDataComponent implements OnInit {
  TemperatureCurrArray: any[]=[];
  TemperatureHistArray: any[]=[];
  TemperatureHistTable: ArduinoFirebase[]=[
    {data: 'bla', time: 'bla'},
  ];
  HumidityCurrArray: any[]=[];
  tableColumns  :  string[] = ['data', 'time'];
  TemperatureCurr: string;
  HumidityCurr: string;
  interval: any;
  history:boolean=false;
  constructor(private arduinoDataService: ArduinoDataService) { }

  ngOnInit(): void {
    this.TemperatureCurr=" ";
    this.HumidityCurr=" ";
    this.updateData();
    this.interval = setInterval(() => {
      this.updateData();
    }, 10000);
  }
  updateData(){
    this.arduinoDataService.fillCurrTempData().then(son => {
      this.TemperatureCurrArray=this.arduinoDataService.getCurrTemp();
      this.TemperatureCurr=this.TemperatureCurrArray[0].data;
    })
    this.arduinoDataService.fillCurrHumData().then(son => {
      this.HumidityCurrArray=this.arduinoDataService.getCurrHum();
      this.HumidityCurr=this.HumidityCurrArray[0].data;
    })
  }

  getHistoryData(){
    this.arduinoDataService.fillHistTempData().then(son => {
      this.TemperatureHistArray=this.arduinoDataService.getHistTemp();
      for(var i=0; i<this.TemperatureHistArray.length;i++){
        /*var dat: ArduinoFirebase;
        dat.data=this.TemperatureHistArray[i].data;
        dat.time=this.TemperatureHistArray[i].time;
        this.TemperatureHistTable.push(dat);*/
      }
      this.history=true;
    })

  }

  ShowHistory(){

    this.getHistoryData();
  }

}
