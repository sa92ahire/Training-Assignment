import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable(
{
    providedIn: 'root'
}
)
export class AuthService {

    constructor(private http:HttpClient){}
    
    signup(email : string, password : string)
    {
     return this.http.post('https://localhost:5001/Auth/Register',
        {
            "userName": email,
            "password": password
        }
        );
    }

    login(email : string, password : string)
    {
     return this.http.post('https://localhost:5001/Auth/Login',
        {
            "userName": email,
            "password": password
        }
        );
    }
}