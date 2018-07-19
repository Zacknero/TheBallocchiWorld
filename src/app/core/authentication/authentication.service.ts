import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser: User = {
    isAuthenticated: false,
    userId: '',
    token: '',
    refreshToken: ''
  };

  login(value: any) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          this.currentUser.refreshToken = res.user.refreshToken;
          this.currentUser.isAuthenticated = true;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

          firebase.auth().currentUser.getIdToken(true)
            .then((data) => {
              this.currentUser.token = data;
            });

        }, err => reject(err));
    });
  }

  isLogged() {
    return JSON.parse(localStorage.getItem('currentUser')).isAuthenticated;
  }

  get token() {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
