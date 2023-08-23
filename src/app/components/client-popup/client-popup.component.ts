import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input('status') status: boolean = true;
  @Input('client') client: Client;
  @Output() createClient = new EventEmitter();
  @Output() editClient = new EventEmitter();
  @Output() modalClose = new EventEmitter<void>();

  newClient: any;

  constructor() {}

  ngOnInit(): void {
    this.newClient = {
      name: '',
      description: '',
    };
  }

  ngOnChanges() {
    if (this.client.name) {
      this.newClient.name = this.client.name;
    }
    if (this.client.description) {
      this.newClient.description = this.client.description;
    }
  }

  closeModal() {
    this.modalClose.emit();
  }

  confirmCreateClient() {
    this.client.name = this.newClient.name;
    this.client.description = this.newClient.description;

    this.createClient.emit();
  }

  confirmEditClient() {
    this.client.name = this.newClient.name;
    this.client.description = this.newClient.description;
    this.editClient.emit();
  }
}
