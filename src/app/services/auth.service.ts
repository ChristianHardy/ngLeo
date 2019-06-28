import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { CryptoService } from './crypto.service';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private cryptoService: CryptoService,
    private cookieService: CookieService
  ) { }

  login(): Observable<any> {
    return new Observable(observer => {
      setTimeout(() => {
        const token = 'asdfgh';
        const tokenCrypted = this.cryptoService.encrypt(token);
        this.cookieService.set('token', tokenCrypted, moment().add(3, 'd').toDate(), '/');
        observer.next(tokenCrypted);
      }, 2000);
    });
  }

  checkSession(): boolean {
    const sessionActive = this.cookieService.check('token');
    return sessionActive;
  }
}
