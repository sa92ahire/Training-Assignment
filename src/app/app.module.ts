import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient,HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { LoanAddComponent } from './loan/loan-add/loan-add.component';
import { LoanUpdateComponent } from './loan/loan-update/loan-update.component'
import { JwtInterceptor } from './JwtInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoanListComponent,
    LoanAddComponent,
    LoanUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
