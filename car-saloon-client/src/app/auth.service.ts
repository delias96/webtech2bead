import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken = '';

  constructor() {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      this.setAccessToken(token);
    }
  }

  isLoggedIn() {
    return !!this.accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(value: string) {
    this.accessToken = value;
    window.localStorage.setItem('accessToken', this.accessToken);
  }

  logOut() {
    this.accessToken = '';
    window.localStorage.clear();
  }
}
