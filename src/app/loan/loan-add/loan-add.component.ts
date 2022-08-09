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

  constructor(private loanservice:LoanService,private router: Router) { }

  ngOnInit(): void {
  }
  OnSubmit(addForm : NgForm)
  {
    if(!addForm.valid)
    {
      return;
    }
    const firstName = addForm.value.firstName;
    const lastName = addForm.value.lastName;
    const propertyAddress = addForm.value.propertyAddress;
    const userId = parseInt(localStorage.getItem("userId"));


    this.loanservice.Addloan(firstName,lastName,propertyAddress,userId).subscribe(resData=>{
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
