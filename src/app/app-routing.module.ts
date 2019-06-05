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
    path: `login`,
    loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule)
  },
  {
    path: `home`,
    canActivate: [AuthGuard],
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule)
  },
  {
    path: `admin`,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'admin'
    },
    loadChildren: () => import(`./modules/admin/admin.module`).then(m => m.AdminModule)
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
