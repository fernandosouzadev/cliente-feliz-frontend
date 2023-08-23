import { Component, OnInit } from '@angular/core';
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
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

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
}
