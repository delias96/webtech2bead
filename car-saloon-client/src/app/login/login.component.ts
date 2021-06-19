import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.errorMessage = '';

    this.http
      .post('login', {
        username: this.username,
        password: this.password,
      })
      .subscribe(
        (data: any) => {
          this.auth.setAccessToken(data.accessToken);
          this.router.navigate(['cars']);
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Invalid credentials.';
          } else {
            this.errorMessage = 'Unexpected error.';
          }
        }
      );
  }
}
