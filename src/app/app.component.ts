import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loan-App';
  userId : any;
  
  constructor(private router:Router){
    this.userId =localStorage.getItem("userId");
  }
  logout()
  {
    localStorage.removeItem("userId");
    this.router.navigate(['/auth']);

  }
}
