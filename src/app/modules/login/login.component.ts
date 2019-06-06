import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as fromAuth from '../../core/authentication/store/auth.reducer';
import * as AuthAction from '../../core/authentication/store/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<fromAuth.State>) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.fb.group({
      email: ['pinocchio@live.it', [Validators.pattern(/\S+@\S+\.\S+/), Validators.required]],
      password: ['bugiardo', [Validators.minLength(8), Validators.required]]
    });
  }

  login() {
    const user = {email: this.formLogin.value.email, password: this.formLogin.value.password};
    this.store.dispatch(new AuthAction.TrySignin({username: user.email, password: user.password}));
  }

}
