import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CadastroRealizadoComponent } from './components/cadastro-realizado/cadastro-realizado.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { LoginComponent } from './components/login/login.component';
import { PerdeuSenhaComponent } from './components/perdeu-senha/perdeu-senha.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ResetarSenhaComponent } from './components/resetar-senha/resetar-senha.component';
import { ValidarEmailComponent } from './components/validar-email/validar-email.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
  {
    path: 'registrar',
    component: RegistrarComponent,
    data: {
      title: 'Registrar',
    },
  },
  {
    path: 'esqueci-minha-senha',
    component: PerdeuSenhaComponent,
    data: {
      title: 'Esqueci minha senha',
    },
  },
  {
    path: 'resetar-senha/:id',
    component: ResetarSenhaComponent,
    data: {
      title: 'Alterar minha senha',
    },
  },
  {
    path: 'cadastro-sucesso',
    component: CadastroRealizadoComponent,
    data: {
      title: 'Cadastro realizado com sucesso',
    },
  },
  {
    path: 'validar-email/:token',
    component: ValidarEmailComponent,
    data: {
      title: 'Validar E-mail',
    },
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Clientes',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
