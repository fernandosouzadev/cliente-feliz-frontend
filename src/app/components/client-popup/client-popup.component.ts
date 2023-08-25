import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';

interface Client {
  _id?: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-client-popup',
  templateUrl: './client-popup.component.html',
  styleUrls: ['./client-popup.component.css'],
})
export class ClientPopupComponent implements OnInit {
  @Input('status') status: boolean;
  @Input('client') client: Client;
  @Input('clientes') clientes: Client[];
  @Input('loading') isLoading: boolean;
  @Input('type') type: string;
  @Output() modalClose = new EventEmitter<void>();

  newClient: any;
  formulario: FormGroup;
  isInvalid: boolean;

  constructor(
    private clientService: ClientService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.newClient = {
      name: '',
      description: '',
    };
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnChanges() {
    if (this.client._id) {
      this.newClient._id = this.client._id;
    }
    if (this.client.name) {
      this.newClient.name = this.client.name;
    }
    if (this.client.description) {
      this.newClient.description = this.client.description;
    }
    if (this.status === true) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.modalClose.emit();
    this.newClient = {
      name: '',
      description: '',
    };
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.closeModal();
  }

  @HostListener('document:click', ['$event']) onClickHandler(
    event: MouseEvent
  ) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('client-popup')) {
      this.closeModal();
    }
  }

  createClient() {
    this.client.name = this.newClient.name;
    this.client.description = this.newClient.description;
    this.isLoading = true;
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
        this.isLoading = false;
        this.clientes.push(data.client);
        this.modalClose.emit();
        this.toastService.toastSucess(``, 'Cliente adicionado com sucesso!');
      },
      (error) => {
        this.isLoading = false;
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
  }

  editClient() {
    this.isLoading = true;
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

    const isExistClientName = this.clientes.find(
      (cliente) => cliente.name === this.newClient.name
    );

    if (
      isExistClientName?.name === this.newClient.name &&
      isExistClientName?._id !== this.newClient?._id
    ) {
      this.toastService.toastError(
        'Já possui um cliente com esse nome',
        'Ops, aconteceu um erro'
      );
      this.isLoading = false;
      return;
    }

    if (
      isExistClientName?.name === this.newClient.name &&
      isExistClientName?.description === this.newClient.description
    ) {
      this.toastService.toastError(
        'Já possui um cliente com esses dados',
        'Ops, aconteceu um erro'
      );
      this.isLoading = false;
      return;
    }

    this.client.name = this.newClient.name;
    this.client.description = this.newClient.description;

    this.isLoading = true;
    this.clientService.editClient(this.client).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.clientes.forEach((client) => {
          if (client._id === data.updatedClient._id) {
            client = data.updatedClient;
          }
        });
        this.modalClose.emit();
        this.toastService.toastSucess(
          data.message,
          'Cliente atualizado com sucesso!'
        );
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
        this.toastService.toastError(
          error.error.message,
          'Ops, aconteceu um erro'
        );
      }
    );
  }

  validatedFields(type: string) {
    if (this.formulario.status === 'VALID' && type === 'create') {
      this.isInvalid = false;
      this.createClient();
    } else if (this.formulario.status === 'VALID' && type === 'edit') {
      this.isInvalid = false;
      this.editClient();
    } else {
      this.isInvalid = true;
      return;
    }
  }
}
