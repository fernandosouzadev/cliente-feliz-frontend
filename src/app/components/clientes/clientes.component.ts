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
  IsSearching: boolean = false;
  typePopupClient: string = 'create';
  isLoadingCliente: boolean = false;
  isLoadingSearch: boolean = false;

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
    this.typePopupClient = 'edit';
    this.statusPopupClient = true;
    this.client = client;
  }

  setDeleteClient(id) {
    this.clientSeleted = id;
    this.statusPopupDelete = true;
  }

  setStatusPopup() {
    this.typePopupClient = 'create';
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

  deleteClient() {
    this.isLoadingCliente = true;
    this.clientService.deleteClient(this.clientSeleted).subscribe(
      (data: any) => {
        this.isLoadingCliente = false;
        this.clientes = data.clients;
        this.closeModalDelete();
        this.toastService.toastSucess(
          `O usuario com ID:${this.clientSeleted} foi deletado`,
          'Usuario deletado com sucesso!'
        );
      },
      (error) => {
        this.isLoadingCliente = false;
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
        this.IsSearching = false;
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
      this.IsSearching = false;
    } else {
      this.isLoadingSearch = true;
      this.clientService.searchClient(this.search).subscribe(
        (data: any) => {
          this.IsSearching = false;
          this.isLoadingSearch = false;
          this.clientes = data.clients;
        },
        (error) => {
          this.IsSearching = true;
          this.isLoadingSearch = false;
          if (error.status === 404) {
            this.clientes = [];
          } else {
            this.toastService.toastError(
              error.error.message,
              'Ops, aconteceu um erro'
            );
          }
        }
      );
    }
  }
}
