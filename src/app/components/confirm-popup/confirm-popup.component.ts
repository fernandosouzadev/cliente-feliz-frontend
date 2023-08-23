import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css'],
})
export class ConfirmPopupComponent implements OnInit {
  @Input('status') status: boolean = true;
  @Input('message') message: string;
  @Output() confirm = new EventEmitter();
  @Output() modalClose = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.modalClose.emit();
  }

  confirmDelete() {
    this.confirm.emit();
  }
}
