import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.css'],
})
export class UpdateCarComponent implements OnInit {
  public carId = 0;
  public car: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.carId = params['id'];
      this.fetchCar();
    });
  }

  fetchCar() {
    this.http.get(`cars/${this.carId}`).subscribe((data: any) => {
      this.car = data;
    });
  }

  onSubmit(car: any) {
    this.http.post(`cars/${this.carId}`, car).subscribe(() => {
      this.router.navigate(['cars']);
    });
  }
}
