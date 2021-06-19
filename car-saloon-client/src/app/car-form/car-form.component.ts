import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const padZero = (input: any) =>
  String(input).length === 1 ? `0${input}` : input;

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
})
export class CarFormComponent implements OnInit {
  @Input() car?: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  public formData: any = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    const car = changes.car.currentValue;
    const dateOfManufacture = new Date(car.dateOfManufacture);
    this.formData = {
      ...car,
      dateOfManufacture: `${dateOfManufacture.getFullYear()}-${padZero(
        dateOfManufacture.getMonth() + 1
      )}-${padZero(dateOfManufacture.getDate())}`,
    };
  }

  handleFormSubmit() {
    this.onSubmit.emit({
      ...this.formData,
      dateOfManufacture: new Date(this.formData.dateOfManufacture),
    });
  }
}
