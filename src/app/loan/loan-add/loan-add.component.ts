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

  firstName : string;
  lastName : string;
  propertyAddress : string;
  isAdd : boolean;
  constructor(private loanservice:LoanService,private router: Router) { }

  ngOnInit(): void {
    this.firstName = "First";
  }
  OnSubmit(addForm : NgForm)
  {
    if(!addForm.valid)
    {
      return;
    }

    const userId = parseInt(localStorage.getItem("userId"));

    this.loanservice.Addloan(this.firstName,this.lastName,this.propertyAddress,userId,this.isAdd).subscribe(resData=>{
      if(resData!=0)
      {
          if(resData!=null)
          {
            alert("Load added successfully.");
            this.router.navigate(['/loanList'])
          }
      }
    },
      error=> {console.log(error)}
    )
    addForm.reset;
  }
}
