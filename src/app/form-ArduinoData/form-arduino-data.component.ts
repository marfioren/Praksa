import { Component, OnInit } from '@angular/core';
import { ArduinoFirebase } from '../security/Arduino-firebase';
import { ArduinoDataService } from '../security/arduino-data.service';
import {MatTableModule} from '@angular/material/table';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
@Component({
  selector: 'app-form-arduino-data',
  templateUrl: './form-arduino-data.component.html',
  styleUrls: ['./form-arduino-data.component.scss']
})
export class FormArduinoDataComponent implements OnInit {

  TemperatureCurrArray: any[]=[];
  TemperatureHistArray: any[]=[];
  TemperatureHistTable: ArduinoFirebase[]=[];

  HumidityCurrArray: any[]=[];
  HumidityHistArray: any[]=[];
  HumidityHistTable: ArduinoFirebase[]=[];

  tableColumns  :  string[] = ['data', 'time'];
  TemperatureCurr: string;
  HumidityCurr: string;
  interval: any;
  history:boolean=false;
  GraphTempTime: string[]=[];
  GraphTempData: number[]=[];
  GraphHumData: number[]=[];
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
        if(this.TemperatureHistArray[i].data) {
          var dat: ArduinoFirebase={data: 'bla', time: 'bla'};
          dat.data = this.TemperatureHistArray[i].data;
          dat.time = this.TemperatureHistArray[i].time;
          this.GraphTempData.push(Number(dat.data));
          this.TemperatureHistTable.push(dat);
        }
      }
    })

    this.arduinoDataService.fillHistHumData().then(son => {
      this.HumidityHistArray=this.arduinoDataService.getHistHum();
      for(var i=0; i<this.HumidityHistArray.length;i++){
        if(this.HumidityHistArray[i].data) {
          if(Number(this.HumidityHistArray[i].data)<101) {
            var dat: ArduinoFirebase={data: 'bla', time: 'bla'};
            dat.data = this.HumidityHistArray[i].data;
            dat.time = this.HumidityHistArray[i].time;
            this.GraphHumData.push(Number(dat.data));
            this.HumidityHistTable.push(dat);
          }
        }
      }
      this.history=true;
    })

  }

  ShowHistory(){
    this.getHistoryData();

  }
  CloseHistory(){
    this.history=false;
    this.TemperatureHistArray.length=0;
    this.GraphTempData.length=0;
  }
  RefreshHistory(){
    this.history=false;
    this.TemperatureHistArray.length=0;
    this.GraphTempData.length=0;
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
      data: this.GraphTempData,
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
      data: this.GraphHumData,
      type: 'line',
      areaStyle: {}
    }]
  }

}
