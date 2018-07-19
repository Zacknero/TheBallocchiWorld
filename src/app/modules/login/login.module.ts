import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const router: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(router)
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
