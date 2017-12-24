import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DhanaService } from '../services/dhana.service';
import { DhanaRequest } from '../models/DhanaRequest';
@Component({
  selector: 'app-add-dhana',
  templateUrl: './add-dhana.component.html',
  styleUrls: ['./add-dhana.component.css']
})
export class AddDhanaComponent implements OnInit {

  firstName ?: string="Asanka";
  lastName ?: string="Dissanayake";
  email ?: string;
  dayOfMonth ?: number=5;
  specialNotes ?: string;
  days ?:number[];
  errorMessage ?:string;

  reminderAddResult ?:boolean=undefined;
  eventLink ?:string='';



  constructor(private dhanaService:DhanaService) { 
    let d=[];
    for(var i=1;i<32;i++){
      d.push(i);
    }
    this.days=d;
  }

  ngOnInit() {
  }

  addDhana(){

    var self=this;
    this.dhanaService
    .addDhana(new DhanaRequest(this.firstName,this.lastName,this.email,this.dayOfMonth,this.specialNotes))
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
