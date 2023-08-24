import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { matchPassword } from 'src/app/Validators/match-password.validator';

interface Data {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.component.html',
  styleUrls: ['./resetar-senha.component.css'],
})
export class ResetarSenhaComponent implements OnInit {
  data: Data;
  formulario: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('id');
    this.data = {
      email: '',
      password: '',
      confirmPassword: '',
      token,
    };

    this.formulario = new FormGroup({
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

  resetPassword() {
    this.authService.resetPassword(this.data).subscribe(
      (data: any) => {
        this.toastService.toastSucess(data.message, 'Senha alterada');
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
      this.resetPassword();
    }
  }
}
