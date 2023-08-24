import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-perdeu-senha',
  templateUrl: './perdeu-senha.component.html',
  styleUrls: ['./perdeu-senha.component.css'],
})
export class PerdeuSenhaComponent implements OnInit {
  email: string;
  formulario: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  recuperarSenha() {
    this.authService.forgotPassword(this.email).subscribe(
      (data: any) => {
        this.toastService.toastSucess(data.message, 'E-mail enviado!');
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
      this.recuperarSenha();
    }
  }

  backLogin() {
    this.router.navigate(['/login']);
  }
}
