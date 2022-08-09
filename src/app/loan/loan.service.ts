import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private http:HttpClient) { }

  loanlist(userId : number)
    {
      return this.http.get(`https://localhost:5001/Auth/LoanList/${userId}`);
    }

  Addloan(fName : string, LName : string, pAddress : string, userId : number, isAdd : boolean)
   {
     return this.http.post('https://localhost:5001/Auth/AddLoan',
     {
        "firstName": fName,
        "lastName" : LName,
        "propertyAddress" : pAddress,
        "userId" : userId,
        "isAdd" : isAdd
     }
     );
   }
}
