import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { LoanAddComponent } from './loan/loan-add/loan-add.component';
import { LoanUpdateComponent } from './loan/loan-update/loan-update.component'

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
