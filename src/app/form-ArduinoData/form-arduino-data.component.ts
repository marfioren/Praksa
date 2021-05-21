import { Component, OnInit } from '@angular/core';
import { ArduinoDataService } from '../security/arduino-data.service';
@Component({
  selector: 'app-form-arduino-data',
  templateUrl: './form-arduino-data.component.html',
  styleUrls: ['./form-arduino-data.component.css']
})
export class FormArduinoDataComponent implements OnInit {
  TemperatureCurrArray: any[]=[];
  TemperatureHistArray: any[]=[];
  HumidityCurrArray: any[]=[];
  TemperatureCurr: string;
  HumidityCurr: string;
  interval: any;
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
        console.log(this.TemperatureHistArray[i].time);
      }

    })

  }

  ShowHistory(){

    this.getHistoryData();
  }

}
