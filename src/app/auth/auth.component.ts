import { templateJitUrl } from '@angular/compiler';
import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'

@Component({
selector : 'app-auth',
templateUrl : './auth.component.html'

})

export class AuthComponent {
    isLoginMode =   true;

    constructor(private authService: AuthService, private router: Router){}
    onSwitchMode()
    {
        this.isLoginMode = !this.isLoginMode;
    }
    OnSubmit(authForm : NgForm)
    {
        if(!authForm.valid)
        {
            return;
        }
        const email = authForm.value.email;
        const password = authForm.value.password;

        if(this.isLoginMode)
        {
            this.authService.login(email, password).subscribe(resData => {
                    if(resData!=0)
                    {
                        if(resData!=null)
                        {
                            localStorage.setItem("userId", resData.toString());
                        }
                        alert("User logged in successfully.");
                        this.isLoginMode = true;
                        this.router.navigate(['/loanList']);
                    }
                    else
                    {
                        alert("User does not exists. Please signup");
                    }
                },
                error => {
                    console.log(error);
                }
            ); 
        }
        else
        {
            this.authService.signup(email, password).subscribe(resData => {
                console.log(resData);
                    if(resData!=0)
                    {
                        alert("User registered successfully.");
                        this.isLoginMode = true;
                    }
                    else
                    {
                        alert("User name already exists.");
                    }
                },
                error => {
                    console.log(error);
                }
            );
        }
        
       authForm.reset;
    }
}