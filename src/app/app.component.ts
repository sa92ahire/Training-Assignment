import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Loan-App';
  userId : any;
  // path: any = "";
  constructor(private router:Router){
     this.userId =localStorage.getItem("userId");
    //  this.path = window.location.pathname;
  }
  ngOnInit(): void {
    this.userId =localStorage.getItem("userId");

  }
  logout()
  {
    this.router.navigate(['/auth']);
    localStorage.removeItem("userId");
    window.location.reload();

  }
}
