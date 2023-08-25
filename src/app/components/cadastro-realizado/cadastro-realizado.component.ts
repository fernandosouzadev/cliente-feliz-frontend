import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-realizado',
  templateUrl: './cadastro-realizado.component.html',
  styleUrls: ['./cadastro-realizado.component.css'],
})
export class CadastroRealizadoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateLogin() {
    this.router.navigate(['/login']);
  }
}
