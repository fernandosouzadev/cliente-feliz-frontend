import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

interface User {
  email: string;
  password: string;
}

interface DataUser {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    isVerify: boolean;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User;
  constructor(
    private router: Router,
    private authServicer: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.user = { email: '', password: '' };
  }

  navigate = (url) => {
    this.router.navigate([url]);
  };

  login() {
    this.authServicer.login(this.user).subscribe(
      (data: DataUser) => {
        if (data.token) {
          this.authServicer.setUser(data.user);
          this.authServicer.setToken(data.token);
          this.router.navigate(['/clientes']);
        }
      },
      (error) => {
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
  }
}
