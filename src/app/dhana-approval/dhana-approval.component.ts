import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DhanaService } from '../services/dhana.service';

@Component({
  selector: 'app-dhana-approval',
  templateUrl: './dhana-approval.component.html',
  styleUrls: ['./dhana-approval.component.css']
})
export class DhanaApprovalComponent implements OnInit {


  key:string;

  constructor(private route: ActivatedRoute,private dhanaService:DhanaService) { }

  ngOnInit() {
    console.log("init");
    this.route.queryParamMap.forEach((data)=>{
      console.log(data.get("key"));
      this.key=data.get("key");
    })

  }

  approve(){

    console.log("Approved: "+this.key);
    this.dhanaService.approveDhana(this.key).then((data)=>{
      console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    });

  }

  reject(){
    console.log("Rejected:"+this.key);

  }

  

}
