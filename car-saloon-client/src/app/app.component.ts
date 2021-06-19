import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'car-saloon-client';

  constructor(public auth: AuthService, private router: Router) {}

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/']);
  }
}
