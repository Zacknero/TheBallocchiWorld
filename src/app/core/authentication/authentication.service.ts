import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  private currentUser: User = {
    isAuthenticated: false,
    userId: '',
    token: '',
    refreshToken: ''
  };

  constructor(private router: Router) {
  }

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

          this.loggedIn.next(true);
          this.router.navigate(['home']);

        }, err => reject(err));
    });
  }

  get isLogged() {
    // return JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')).isAuthenticated : false;
    return this.loggedIn.asObservable();
  }

  token() {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}
