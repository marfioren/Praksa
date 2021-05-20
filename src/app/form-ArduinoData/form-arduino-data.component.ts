import { Component, OnInit } from '@angular/core';
import { ArduinoFirebase } from '../security/Arduino-firebase';
import { ArduinoDataService } from '../security/arduino-data.service';
import {UserService} from '../security/user.service';
@Component({
  selector: 'app-form-arduino-data',
  templateUrl: './form-arduino-data.component.html',
  styleUrls: ['./form-arduino-data.component.css']
})
export class FormArduinoDataComponent implements OnInit {
  TemperatureCurr: any[]=[];

  constructor(private arduinoDataService: ArduinoDataService) { }

  ngOnInit(): void {
    this.arduinoDataService.fillCurrTempData().then(son => {
      this.TemperatureCurr=this.arduinoDataService.getCurrTemp();
      console.log(this.TemperatureCurr);
    })
  }

}
