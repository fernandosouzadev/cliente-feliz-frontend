import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ResetarSenhaComponent } from './components/resetar-senha/resetar-senha.component';
import { PerdeuSenhaComponent } from './components/perdeu-senha/perdeu-senha.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidarEmailComponent } from './components/validar-email/validar-email.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { ClientPopupComponent } from './components/client-popup/client-popup.component';
import { CadastroRealizadoComponent } from './components/cadastro-realizado/cadastro-realizado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    ResetarSenhaComponent,
    PerdeuSenhaComponent,
    ClientesComponent,
    ValidarEmailComponent,
    ConfirmPopupComponent,
    ClientPopupComponent,
    CadastroRealizadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
