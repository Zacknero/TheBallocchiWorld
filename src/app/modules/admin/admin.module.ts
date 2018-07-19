import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

const router: Routes = [
  {
    path: '',
    component: AdminComponent,
    pathMatch: 'full'
  }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  declarations: []
})
export class AdminModule {
}
