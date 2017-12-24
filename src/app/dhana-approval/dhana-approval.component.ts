import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dhana-approval',
  templateUrl: './dhana-approval.component.html',
  styleUrls: ['./dhana-approval.component.css']
})
export class DhanaApprovalComponent implements OnInit {


  id:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("init");
    this.route.queryParamMap.forEach((data)=>{
      console.log(data.get("id"));
      this.id=data.get("id");
    })

  }

  approve(){

    console.log("Approved: "+this.id);

  }

  reject(){
    console.log("Rejected:"+this.id);

  }

  

}
