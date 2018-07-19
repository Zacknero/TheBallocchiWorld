import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FirstComponent} from './first/first.component';
import {HomeComponent} from './home.component';

const router: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'first',
    component: FirstComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class HomeRoutingModule {
}
