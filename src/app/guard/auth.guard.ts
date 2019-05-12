import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private loginUrl: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.loginUrl = 'login';
  }

  checkSession(): boolean | UrlTree {
    let sessionActivate: boolean | UrlTree = false;
    const sessionActive = this.authService.checkSession();

    if (sessionActive) {
      sessionActivate = true;
    } else {
      sessionActivate = this.router.parseUrl(this.loginUrl);
    }

    return sessionActivate;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkSession();
  }
}
