import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
export type EditorType = 'username' | 'profile';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LogIn';
  editor: EditorType = 'username';

  get showNameEditor() {
    return this.editor === 'username';
  }

  get showProfileEditor() {
    return this.editor === 'profile';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
