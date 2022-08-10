import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  lstloan : any;
  searchTerm : any;
  lstloanTemp : any;
  isadmin : any = false;
  userId : number;
  constructor(private loanservice:LoanService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem("userId"));
    this.loanservice.loanlist(this.userId).subscribe((resData) => {
      this.lstloan = resData;
      this.lstloanTemp = this.lstloan;
      

      // assuming the role will come as string from backend like "admin"
      // if user is admin then setting the isadmin flag.
      // adding condition for just sample.
      this.lstloan = (  this.lstloan || [])?.map((obj) => {
        if(this.userId === 3002) {
          this.isadmin = true;
          return { ...obj, role: "admin"};
        }
        return {...obj, role: "user" };
      });
      
    },
    error=>{
      console.log(error);
    })
  }
  search(): void {
    let term = this.searchTerm.toLowerCase();
    this.lstloan = this.lstloanTemp.filter(function(tag) {
        return ((tag.firstName.toLowerCase().indexOf(term) >= 0)
                ||(tag.lastName.toLowerCase().indexOf(term)>=0)||
                (tag.propertyAddress.toLowerCase().indexOf(term)>=0));
    }); 
  }
  RedirectToAddTab()
  {
    this.router.navigate(['/loanAdd']);
  }
  NavigateToEdit(loanId)
  {
    localStorage.setItem("loanId",loanId);
  }

}
