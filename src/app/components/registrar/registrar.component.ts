import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { matchPassword } from 'src/app/Validators/match-password.validator';

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  user: User;
  formulario: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        matchPassword('confirmPassword', true),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        matchPassword('password'),
      ]),
    });
  }

  registrar() {
    this.authService.registrar(this.user).subscribe(
      (data: any) => {
        this.toastService.toastSucess(data.message, 'Usuario Registrado!');
        this.router.navigate(['/login']);
      },
      (error) => {
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
  }

  validatedFields() {
    if (this.formulario.status === 'INVALID') {
      return;
    } else {
      this.registrar();
    }
  }

  backLogin() {
    this.router.navigate(['/login']);
  }
}
