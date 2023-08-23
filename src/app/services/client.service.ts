import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { env } from '../config/env';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public urlApi = env.API_URL;
  public token: string;

  constructor(
    public http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getClients() {
    const url = `${this.urlApi}/client`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  createClient(client) {
    const url = `${this.urlApi}/client`;
    const headers = this.getHeaders();
    return this.http.post(url, client, { headers });
  }

  editClient(client) {
    const url = `${this.urlApi}/client/${client._id}`;
    const headers = this.getHeaders();
    return this.http.patch(url, client, { headers });
  }

  deleteClient(id) {
    const url = `${this.urlApi}/client/${id}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

  searchClient(search: string) {
    const url = `${this.urlApi}/client/search/${search}`;
    const headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.token = this.authService.getToken();

    if (this.token) {
      headers = headers.append('Authorization', `Bearer ${this.token}`);
    }

    return headers;
  }
}
