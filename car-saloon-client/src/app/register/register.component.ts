import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  success = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    this.success = false;
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords must match.';
      return;
    }

    this.http
      .post('register', {
        username: this.username,
        password: this.password,
      })
      .subscribe(
        (data) => {
          this.username = this.password = this.confirmPassword = '';
          this.success = true;
        },
        (error) => {
          this.password = '';
          this.confirmPassword = '';

          if (error.status === 409) {
            this.errorMessage = 'Username already taken.';
          } else {
            this.errorMessage = 'Unexpected error.';
          }
        }
      );
  }
}
