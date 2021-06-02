import { Component, OnInit } from '@angular/core';
import { ArduinoFirebase } from '../security/Arduino-firebase';
import { ArduinoDataService } from '../security/arduino-data.service';
import {MatTableModule} from '@angular/material/table';
import { EChartsOption } from 'echarts';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as echarts from 'echarts';
import {AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-form-arduino-data',
  templateUrl: './form-arduino-data.component.html',
  styleUrls: ['./form-arduino-data.component.scss']
})
export class FormArduinoDataComponent implements OnInit {

  temperatureCurrArray: any[]=[];
  temperatureHistArray: any[]=[];
  temperatureHistTable: ArduinoFirebase[]=[];

  humidityCurrArray: any[]=[];
  humidityHistArray: any[]=[];
  humidityHistTable: ArduinoFirebase[]=[];

  tableColumns  :  string[] = ['data', 'time'];
  temperatureCurr: string;
  humidityCurr: string;
  interval: any;
  history:boolean=false;
  graphTempTime: string[]=[];
  graphTempData: number[]=[];
  graphHumData: number[]=[];
  cookieValue:string;
  constructor(private arduinoDataService: ArduinoDataService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('username');
    if(this.cookieValue) {
      console.log(this.cookieValue);
    }
    else{
      this.router.navigateByUrl('/LogIn');

    }

    this.temperatureCurr=" ";
    this.humidityCurr=" ";
    this.updateData();
    this.interval = setInterval(() => {
      this.updateData();
    }, 10000);
  }

  logOut(): void{
    this.cookieService.delete('username');
    this.router.navigateByUrl('/LogIn');
  }
  updateData(): void{
    this.arduinoDataService.fillCurrTempData().then(son => {
      this.temperatureCurrArray=this.arduinoDataService.getCurrTemp();
      this.temperatureCurr=this.temperatureCurrArray[0].data;
    })
    this.arduinoDataService.fillCurrHumData().then(son => {
      this.humidityCurrArray=this.arduinoDataService.getCurrHum();
      this.humidityCurr=this.humidityCurrArray[0].data;
    })
  }

  getHistoryData(): void{
    this.arduinoDataService.fillHistTempData().then(son => {
      this.temperatureHistArray=this.arduinoDataService.getHistTemp();
      this.temperatureHistArray.forEach((value) => {
        if(value.data) {
          var dat: ArduinoFirebase={data: 'bla', time: 'bla'};
          dat.data = value.data;
          dat.time = value.time;
          this.graphTempData.push(Number(dat.data));
          this.temperatureHistTable.push(dat);
        }
      });
    })

    this.arduinoDataService.fillHistHumData().then(son => {
      this.humidityHistArray=this.arduinoDataService.getHistHum();
      this.humidityHistArray.forEach((value) => {
        if(value.data) {
          if(Number(value.data)<101) {
            var dat: ArduinoFirebase={data: 'bla', time: 'bla'};
            dat.data = value.data;
            dat.time = value.time;
            this.graphHumData.push(Number(dat.data));
            this.humidityHistTable.push(dat);
          }
        }
      });
      this.history=true;
    })

  }

  showHistory(): void{
    this.getHistoryData();

  }
  closeHistory(): void{
    this.history=false;
    this.temperatureHistArray.length=0;
    this.graphTempData.length=0;
    this.temperatureHistTable.length=0;
    this.humidityHistTable.length=0;
  }
  refreshHistory(): void{
    this.history=false;
    this.temperatureHistArray.length=0;
    this.graphTempData.length=0;
    this.temperatureHistTable.length=0;
    this.humidityHistTable.length=0;
    this.getHistoryData();
  }


  chartOptionTemp: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: this.graphTempData,
      type: 'line',
      areaStyle: {}
    }]
  }

  chartOptionHum: EChartsOption = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: this.graphHumData,
      type: 'line',
      areaStyle: {}
    }]
  }

}
