import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  
  constructor(private loanservice:LoanService) {
    
   }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId");
    this.loanservice.loanlist(parseInt(userId)).subscribe(resData =>{
      console.log(resData);

    },
    error=>{
      console.log(error);
    })
  }

}
