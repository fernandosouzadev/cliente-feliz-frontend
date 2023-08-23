import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { env } from '../config/env';
import { Router } from '@angular/router';

interface User {
  _id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public urlApi = env.API_URL;
  public token: string;
  user: User;

  constructor(public http: HttpClient, private router: Router) {}

  login(user) {
    const url = `${this.urlApi}/users/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      email: user.email,
      password: user.password,
    };
    return this.http.post(url, body, { headers });
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  registrar(user) {
    const url = `${this.urlApi}/users/register`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    };
    return this.http.post(url, body, { headers });
  }

  validationEmail(token) {
    const url = `${this.urlApi}/users/validation-email`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      emailToken: token,
    };
    return this.http.post(url, body, { headers });
  }

  forgotPassword(email) {
    const url = `${this.urlApi}/users/forgot-password`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      email,
    };
    return this.http.post(url, body, { headers });
  }

  resetPassword(data) {
    const url = `${this.urlApi}/users/reset-password`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      token: data.token,
    };
    return this.http.post(url, body, { headers });
  }

  isAuthenticated() {
    const url = `${this.urlApi}/users/checkuser`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  setUser(user) {
    this.user = user;
  }

  setToken(token: string) {
    this.token = token;
    sessionStorage.setItem('token', this.token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (this.token) {
      headers = headers.append('Authorization', `Bearer ${this.token}`);
    }

    return headers;
  }
}
