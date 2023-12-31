import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-validar-email',
  templateUrl: './validar-email.component.html',
  styleUrls: ['./validar-email.component.css'],
})
export class ValidarEmailComponent implements OnInit {
  private token: string;
  isValidToken: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      this.authService.validationEmail(this.token).subscribe(
        (data: any) => {
          this.toastService.toastSucess(data.message, 'E-mail confirmado!');
          this.isValidToken = true;
        },
        (error) => {
          this.isValidToken = false;
          this.toastService.toastError(
            error.error.message,
            'Ops, aconteceu um erro'
          );
        }
      );
    }
  }

  navigateLogin() {
    this.router.navigate(['/login']);
  }
}
