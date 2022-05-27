import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = "Arjun";
  password = "123456";

  constructor(private service: UserService,private router:Router) { }

  ngOnInit(): void {
  }

  Login(){
    this.service.checkLogin(this.username,this.password).subscribe(res => {
      console.log(res);
    })

    this.service.getToken(this.username,this.password).subscribe(res => {
      console.log(res);
      localStorage.setItem("user_name",res.user_name);
      localStorage.setItem("jwt_token",res.jwt_token);
      localStorage.setItem("refresh_token",res.refresh_token);
      this.router.navigate(['master'])
    },err => {
      console.log(err);
    });
  }

}
