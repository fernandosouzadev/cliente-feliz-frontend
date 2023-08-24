import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Cliente Feliz';
  private token: string;

  constructor(private router: Router, private authServicer: AuthService) {}

  ngOnInit(): void {
    this.token = this.authServicer.getToken();
    if (this.token) {
      this.authServicer.setToken(this.token);
    }
    if (
      (this.router.url === '/' || this.router.url === '/login') &&
      this.token
    ) {
      this.router.navigate(['/clientes']);
    }
  }
}
