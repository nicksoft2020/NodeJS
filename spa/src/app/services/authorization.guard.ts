import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {//
  constructor(private router: Router,
    private accountService: AccountService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.accountService.isLoggedIn().toPromise().then(result => {
        if (result) {
          resolve(true);
        }
        else {
            this.accountService.logout();
            this.router.navigate(['login']);
            resolve(false);
        }
      }).catch(error => {
        if (error?.status == 401) {
          this.accountService.logout();
          this.router.navigate(['login']);
        }
      })
    })
  }
}
