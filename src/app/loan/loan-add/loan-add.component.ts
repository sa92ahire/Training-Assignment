import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan-add',
  templateUrl: './loan-add.component.html',
  styleUrls: ['./loan-add.component.css']
})
export class LoanAddComponent implements OnInit {

  firstName : any;
  lastName : any;
  propertyAddress : any;
  isAdd : boolean;
  loanId : number;

  constructor(private loanservice:LoanService,private router: Router) { }

  ngOnInit(): void {
    this.LoadData();
  }
  LoadData()
  {
    this.loanId = parseInt(localStorage.getItem("loanId"));
    if(this.loanId == 0 || this.loanId == undefined || this.loanId == null)
    {
      this.isAdd = true
    }
    this.loanservice.LoanDetails(this.loanId).subscribe((resData: any)=>{
      if(resData!=0)
      {
          if(resData!=null)
          {
            this.firstName = resData.firstName;
            this.lastName = resData.lastName;
            this.propertyAddress = resData.propertyAddress;
            this.isAdd = false;
          }
          localStorage.removeItem("loanId");
      }
    },
      error=> {console.log(error)}
    )
  }
  OnSubmit(addForm : NgForm)
  {
    if(!addForm.valid)
    {
      return;
    }

    const userId = parseInt(localStorage.getItem("userId"));

    this.loanservice.Addloan(this.firstName,this.lastName,this.propertyAddress,userId,this.isAdd,this.loanId).subscribe(resData=>{
      if(resData!=0)
      {
          if(resData!=null)
          {
            alert("Saved successfully.");
            this.router.navigate(['/loanList'])
          }
      }
    },
      error=> {console.log(error)}
    )
    addForm.reset;
  }
}
