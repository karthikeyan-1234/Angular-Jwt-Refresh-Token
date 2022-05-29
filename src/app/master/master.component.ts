import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  Test(){
    this.http.get("https://localhost:5021/Ocelot/Test", {responseType: 'text'}).subscribe(res =>{
      console.log(res);
    });
  }

}
