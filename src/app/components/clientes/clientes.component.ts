import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';

interface Client {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  toggle: boolean = false;
  clientes: Client[] = [];
  client: any;
  user: User;
  statusPopupDelete: boolean = false;
  statusPopupClient: boolean = false;
  clientSeleted: string;
  search: string = '';

  constructor(
    private router: Router,
    private clientService: ClientService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.client = {
      name: '',
      description: '',
    };
    this.user = this.authService.user;

    this.clientService.getClients().subscribe(
      (data: any) => {
        this.clientes = data.clients;
      },
      (error) => {
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
  }

  convertDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  openMenu() {
    this.toggle = !this.toggle;
  }

  setEditClient(client) {
    this.statusPopupClient = true;
    this.client = client;
  }

  setDeleteClient(id) {
    this.clientSeleted = id;
    this.statusPopupDelete = true;
  }

  setStatusPop() {
    this.statusPopupClient = true;
  }

  closeModalDelete() {
    this.statusPopupDelete = false;
  }

  closeModalClient() {
    this.statusPopupClient = false;
    this.client = {
      name: '',
      description: '',
    };
  }

  deslogar() {
    this.authService.logout();
  }

  createClient() {
    if (!this.client?.name) {
      this.toastService.toastError(
        `Você nao preencheu o campo nome`,
        'Campo não preenchido'
      );
      return;
    }

    if (!this.client?.description) {
      this.toastService.toastError(
        `Você nao preencheu o campo descrição`,
        'Campo não preenchido'
      );
      return;
    }
    this.clientService.createClient(this.client).subscribe(
      (data: any) => {
        this.clientes.push(data.client);
        this.closeModalClient();
        this.toastService.toastSucess(``, 'Cliente adicionado com sucesso!');
      },
      (error) => {
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
  }

  editClient() {
    if (!this.client?.name) {
      this.toastService.toastError(
        `Você nao preencheu o campo nome`,
        'Campo não preenchido'
      );
      return;
    }

    if (!this.client?.description) {
      this.toastService.toastError(
        `Você nao preencheu o campo descrição`,
        'Campo não preenchido'
      );
      return;
    }
    this.clientService.editClient(this.client).subscribe(
      (data: any) => {
        this.clientes.forEach((client) => {
          if (client._id === data.updatedClient._id) {
            client = data.updatedClient;
          }
        });
        this.closeModalClient();
        this.toastService.toastSucess(
          data.message,
          'Cliente atualizado com sucesso!'
        );
      },
      (error) => {
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
  }

  deleteClient() {
    this.clientService.deleteClient(this.clientSeleted).subscribe(
      (data: any) => {
        this.clientes = data.clients;
        this.closeModalDelete();
        this.toastService.toastSucess(
          `O usuario com ID:${this.clientSeleted} foi deletado`,
          'Usuario deletado com sucesso!'
        );
      },
      (error) => {
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
  }

  resetarBuscar() {
    this.clientService.getClients().subscribe(
      (data: any) => {
        this.clientes = data.clients;
      },
      (error) => {
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
    this.search = '';
  }

  searchClient() {
    if (this.search === '') {
      this.resetarBuscar();
    } else {
      this.clientService.searchClient(this.search).subscribe(
        (data: any) => {
          this.clientes = data.clients;
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
}
