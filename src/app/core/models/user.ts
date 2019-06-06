export interface User {
  isAuthenticated: boolean;
  userId: string;
  token: string;
  refreshToken: string;
}

export interface Credentials {
  username: string;
  password: string;
}
