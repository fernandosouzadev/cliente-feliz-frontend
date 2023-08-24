import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Client {
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
  @Input('loading') isLoading: boolean;
  @Output() createClient = new EventEmitter();
  @Output() editClient = new EventEmitter();
  @Output() modalClose = new EventEmitter<void>();

  newClient: any;
  formulario: FormGroup;
  isInvalid: boolean;

  constructor() {}

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

  confirmCreateClient() {
    this.client.name = this.newClient.name;
    this.client.description = this.newClient.description;
    this.createClient.emit();
    this.isLoading = true;
    this.closeModal();
  }

  confirmEditClient() {
    this.client.name = this.newClient.name;
    this.client.description = this.newClient.description;
    this.editClient.emit();
    this.isLoading = true;
    this.closeModal();
  }

  validatedFields(type: string) {
    if (this.formulario.status === 'VALID' && type === 'create') {
      this.isInvalid = false;
      this.confirmCreateClient();
    } else if (this.formulario.status === 'VALID' && type === 'edit') {
      this.isInvalid = false;
      this.confirmEditClient();
    } else {
      this.isInvalid = true;
      return;
    }
  }
}
