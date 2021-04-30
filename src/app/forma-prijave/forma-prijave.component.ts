import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-forma-prijave',
  templateUrl: './forma-prijave.component.html',
  styleUrls: ['./forma-prijave.component.css']
})
export class FormaPrijaveComponent{
  prijavaForm = new FormGroup({
    korIme: new FormControl(''),
    lozinka: new FormControl(''),
  });

  // tslint:disable-next-line:typedef
  onSubmit() {
    console.warn(this.prijavaForm.value);
  }
}
