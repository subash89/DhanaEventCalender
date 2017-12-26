import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DhanaService } from '../services/dhana.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dhana-approval',
  templateUrl: './dhana-approval.component.html',
  styleUrls: ['./dhana-approval.component.css']
})
export class DhanaApprovalComponent implements OnInit {


  key:string;
  rForm:FormGroup;
  showMessage:boolean;
  noticeType:string;
  result:boolean;
  constructor(private route: ActivatedRoute,private dhanaService:DhanaService,private fb:FormBuilder) { 
    this.rForm = this.fb.group({
      'specialNotes':''
    });

  }

  ngOnInit() {
    console.log("init");
   
    this.route.queryParamMap.forEach((data)=>{
      console.log(data.get("key"));
      this.key=data.get("key");
    })

  }

  approve(formData){

    console.log("Approved: "+this.key);
    this.dhanaService.approveDhana(this.key).then((data)=>{
      this.noticeType="Approval";
      this.result=true;
      console.log(data);
    })
    .catch((err)=>{
      console.log(err);
      this.result=false;

    });

  }

  reject(formData){

    if(formData.specialNotes.length===0){
      console.log("true");

      this.showMessage=true;
    }else{
      this.showMessage=false;
      this.dhanaService.rejectDhana(this.key,formData.specialNotes).then((data)=>{
        this.noticeType="Notice";
        this.result=true;


      }).catch((err)=>{
        this.result=false;


      });


    }
    
    console.log("Rejected:"+this.key);
    console.log(formData.specialNotes.length);


  }

  

}
