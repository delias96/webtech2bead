import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  public cars: any = [];
  public selectedCars: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCars();
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  fetchCars() {
    this.http.get('cars').subscribe((data: any) => {
      this.cars = data;
    });
  }

  deleteCars() {
    const ids = Object.entries(this.selectedCars)
      .filter(([id, value]) => value)
      .map(([id]) => id);

    this.selectedCars = {};

    const requests = ids.map((id) => this.http.delete(`cars/${id}`));
    forkJoin(requests).subscribe(() => {
      this.fetchCars();
    });
  }
}
