import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  toastSucess(message: string, title: string): void {
    this.toastr.success(message, title, {
      progressBar: true,
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
    });
  }

  toastInfo(message: string, title: string): void {
    this.toastr.info(message, title, {
      progressBar: true,
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
    });
  }

  toastWarning(message: string, title: string): void {
    this.toastr.warning(message, title, {
      progressBar: true,
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
    });
  }

  toastError(message: string, title: string): void {
    this.toastr.error(message, title, {
      progressBar: true,
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
    });
  }
}
