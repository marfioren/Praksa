import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
export type EditorType = 'username' | 'profile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'LogIn';

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {

    this.spinner.show();

    setTimeout(() => {

      this.spinner.hide();
    }, 2000);
  }

}
