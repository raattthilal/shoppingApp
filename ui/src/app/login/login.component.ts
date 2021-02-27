import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data={
    username:'',
    password:''
  }

  regData={
    username:'',
    password:'',
    phone:''
  }
  constructor(private loginService:LoginService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/home']);
    }
  }
  regUser(data){
    this.loginService.registerUser(this.regData).subscribe(res=>{
      if(res.success==true){
        alert(res.message)
      }else{
        alert(res.message)
      }
    })
  }
  login(data){
    this.loginService.loginauth(this.data).subscribe(res=>{
      if(res.success==true){
        localStorage.setItem('token',res.token);
        localStorage.setItem('username',res.user.username)
        this.router.navigate(['/home']);
      }else{
        alert("Wrong user credentials");
      }
    })
  }

}
