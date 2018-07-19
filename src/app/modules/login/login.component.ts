import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.fb.group({
      email: ['pinocchio@live.it', [Validators.pattern(/\S+@\S+\.\S+/), Validators.required] ],
      password: ['bugiardo', [Validators.minLength(8), Validators.required] ]
    });
  }

  login() {
    const user = {email: this.formLogin.value.email, password: this.formLogin.value.password};
    this.authenticationService.login(user)
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
