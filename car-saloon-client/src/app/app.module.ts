import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarListComponent } from './car-list/car-list.component';
import { httpInterceptorProviders } from './http-interceptors/http-interceptors';
import { CarFormComponent } from './car-form/car-form.component';
import { AddCarComponent } from './add-car/add-car.component';
import { UpdateCarComponent } from './update-car/update-car.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'cars/new', component: AddCarComponent },
  { path: 'cars/:id', component: UpdateCarComponent },
];

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CarListComponent,
    CarFormComponent,
    AddCarComponent,
    UpdateCarComponent,
  ],
  bootstrap: [AppComponent],
  providers: [httpInterceptorProviders],
})
export class AppModule {}
