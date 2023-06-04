import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map} from 'rxjs/operators';
import { AuthenService } from '../authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenService, private route: Router) { }

  canActivate() {
    return this.auth.isUserLoggedIn()
  }
}
