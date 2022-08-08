import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http:HttpClient) { }

  loanlist(userId : number)
    {
     return this.http.get(`https://localhost:5001/controller/LoanList/${userId}`);
    }
}
