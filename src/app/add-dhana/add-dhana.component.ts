import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DhanaService } from '../services/dhana.service';
import { ReccurringDhanaRequest } from '../models/DhanaRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dhana',
  templateUrl: './add-dhana.component.html',
  styleUrls: ['./add-dhana.component.css']
})
export class AddDhanaComponent implements OnInit {


  rForm:FormGroup;

  firstName ?: string;
  lastName ?: string;
  email ?: string;
  mobile ?:string;
  dayOfMonth ?: number=5;
  specialNotes ?: string;
  days ?:number[];
  errorMessage ?:string;
  requiredAlert:string="*This field is required";
  validEmailAlert:string="* Valid email address required";
  validMobilelAlert:string="* Valid mobile number required";
  reminderAddResult ?:boolean=undefined;
  eventLink ?:string='';



  constructor(private dhanaService:DhanaService,private fb:FormBuilder) { 
    
    let d=[];
    for(var i=1;i<32;i++){
      d.push(i);
    }
    this.days=d;
    this.rForm = this.fb.group({
      'firstName' : [null, Validators.required],
      'lastName' : [null, Validators.required],
      'email' : [null, Validators.compose([Validators.required,Validators.email])],
      'mobile':[null, Validators.compose([Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)])],
      'dayOfMonth':[null, Validators.required],
      'specialNotes':''
    });

  }

  ngOnInit() {

  }

  addDhana(post){


    var self=this;
    self.firstName=post.firstName;
    self.lastName=post.lastName;
    self.email=post.email;
    self.mobile=post.mobile;
    self.dayOfMonth=post.dayOfMonth;
    self.specialNotes=post.specialNotes;
  
    console.log(post);
    console.log(this.firstName);

    this.dhanaService
    .addDhana(new ReccurringDhanaRequest(this.firstName,this.lastName,this.email,this.mobile,this.specialNotes,this.dayOfMonth))
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
