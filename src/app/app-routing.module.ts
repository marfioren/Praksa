import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInFormComponent } from './form-LogIn/form-LogIn.component';
const routes: Routes = [
  {  path: '', redirectTo: '/LogIn', pathMatch: 'full'},
  { path: 'LogIn', component: LogInFormComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
