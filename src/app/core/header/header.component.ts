import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

import * as AuthAction from '../authentication/store/auth.action';
import {selectAuthAuthenticated} from '../authentication/store/auth.selector';
import {State} from '../../reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  authState$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.authState$ = this.store.pipe(select(selectAuthAuthenticated));
  }

  onLogout() {
    this.store.dispatch(AuthAction.logOut());
  }

}
