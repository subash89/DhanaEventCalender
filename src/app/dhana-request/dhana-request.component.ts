import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DhanaService } from '../services/dhana.service';
import {UpdateDhanaRequest } from '../models/DhanaRequest';

@Component({
  selector: 'app-dhana-request',
  templateUrl: './dhana-request.component.html',
  styleUrls: ['./dhana-request.component.css']
})
export class DhanaRequestComponent implements OnInit {

  rForm:FormGroup;
  days ?:number[];
  firstName ?: string;
  lastName ?: string;
  errorMessage ?:string;
  mobile ?:string;
  post:any;
  requiredAlert:string="*This field is required";
  validEmailAlert:string="* Valid email address required";
  validMobilelAlert:string="* Valid mobile number required";
  email ?: string;
  date ?: Date=new Date();
  dateString:String;
  specialNotes ?: string;

  reminderAddResult ?:boolean=undefined;
  eventLink ?:string='';

  constructor(private dhanaService:DhanaService, private fb:FormBuilder) { 

    this.rForm = this.fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, Validators.compose([Validators.required,Validators.email])],
      'mobile':[null, Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)])],
      'date':[null, Validators.required],
      'specialNotes':''
    });
  }

  ngOnInit() {

  }

  requestDhana(post){

    var self=this;
    self.firstName=post.firstName;
    self.lastName=post.lastName;
    self.email=post.email;
    self.mobile=post.mobile;
    self.date=post.date;
    self.specialNotes=post.specialNotes;
  

    console.log(post);


    this.dhanaService
    .requestDhana(new UpdateDhanaRequest(this.firstName,this.lastName,this.email,this.mobile,this.specialNotes,this.date))
    .then((data)=>{
      console.log(data);
      console.log(data.htmlLink);
      console.log(this);
     self.eventLink=data.htmlLink;
      if(data.status !== undefined && data.status=='confirmed'){
        console.log("Event successfully created");
        self.reminderAddResult=true;
      }
    }).catch((err)=>{
      console.log(err);
      console.log(err.status);
      console.log(err.error[0].summary);
      
      if(err.status==403){
        self.errorMessage="Dhana slot is already taken."+err.error[0].summary;
      }else{
        self.errorMessage="Error occured while adding dhana slot. May be it is already taken";

      }
      self.reminderAddResult=false;

    });
  }

}
