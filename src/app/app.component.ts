import { Component } from '@angular/core';
export type EditorType = 'korIme' | 'profile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Prijava';
  editor: EditorType = 'korIme';

  get showNameEditor() {
    return this.editor === 'korIme';
  }

  get showProfileEditor() {
    return this.editor === 'profile';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
}
