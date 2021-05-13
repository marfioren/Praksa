import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInFormComponent } from './form-LogIn/form-LogIn.component';
import { FormRegistrationComponent } from './form-registration/form-registration.component';
const routes: Routes = [
  {  path: '', redirectTo: '/LogIn', pathMatch: 'full'},
  { path: 'LogIn', component: LogInFormComponent },
  { path: 'Registration', component: FormRegistrationComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
