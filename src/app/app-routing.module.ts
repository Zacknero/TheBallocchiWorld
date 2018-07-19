import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/authentication/auth.guard';

const router: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    },
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(router)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
