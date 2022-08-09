import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoanAddComponent } from './loan/loan-add/loan-add.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { LoanUpdateComponent } from './loan/loan-update/loan-update.component';

const routes: Routes = [
  {path:'auth',component : AuthComponent},
  {path : 'loanList', component : LoanListComponent},
  {path : 'loanAdd', component : LoanAddComponent},
  {path : 'loanEdit', component : LoanUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
