import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private authurl ="5001/authenticate/";
 
  constructor(private http: HttpClient, private router: Router) {}

    loginauth(data) {
      return this.http.post<any>(`${this.authurl}login` , data)
    }
    checktoken(){
      const token = localStorage.getItem('token');
     
      if(!token)
       this.router.navigate(['/login']);
    }
    logout(){
      localStorage.clear();

      this.router.navigate(['/login']);
    }
    registerUser(data){
      return this.http.post<any>(`${this.authurl}create` , data)
    }
}
