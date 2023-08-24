import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css'],
})
export class ConfirmPopupComponent implements OnInit {
  @Input('status') status: boolean = true;
  @Input('message') message: string;
  @Input('loading') isLoading: boolean;
  @Output() confirm = new EventEmitter();
  @Output() modalClose = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.status === true) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.modalClose.emit();
    document.body.style.overflow = '';
  }

  confirmDelete() {
    this.isLoading = true;
    this.confirm.emit();
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
    if (target.classList.contains('confirm-popup')) {
      this.closeModal();
    }
  }
}
