import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let currentUser = localStorage.getItem('userId');
        if (currentUser) {
           console.log("User present");
        }
        else
        {
           if(request.url!="https://localhost:5001/Auth/Login")
           {
            this.router.navigate(['/auth']);
           }
        }
        // console.log("Request", request)
        return next.handle(request);
    }
}