import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';

const routes: Routes = [
  {path:'auth',component : AuthComponent},
  {path : 'loanList', component : LoanListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
