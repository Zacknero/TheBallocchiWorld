import * as AuthAction from './auth.action';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthAction.AuthAction) {
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        authenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
