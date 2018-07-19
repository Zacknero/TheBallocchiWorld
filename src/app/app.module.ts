import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import * as firebase from 'firebase';

import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {AuthInterceptor} from './core/interceptor/auth-interceptor';
import {ErrorInterceptor} from './core/interceptor/error.interceptor';
import {AppRoutingModule} from './app-routing.module';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
