import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      map((data: any) => {
        const isAuth = !!data?._id;
        if (!isAuth) {
          this.router.navigate(['login']);
          return false;
        }
        this.authService.user = data;
        return true;
      })
    );
  }
}
