import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dhana-request',
  templateUrl: './dhana-request.component.html',
  styleUrls: ['./dhana-request.component.css']
})
export class DhanaRequestComponent implements OnInit {

  days ?:number[];
  firstName ?: string="Asanka";
  lastName ?: string="Dissanayake";
  email ?: string;
  date ?: Date=new Date();
  dateString:String;
  specialNotes ?: string;

  reminderAddResult ?:boolean=undefined;
  eventLink ?:string='';

  constructor() { 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var dateString;
    var monthString;
    if(dd<10) {
      dateString = '0'+dd
    } 
    
    if(mm<10) {
      monthString = '0'+mm
    } 
    
    //var todayString = yyyy+"-" +monthString +"-"+dateString;
    var todayString = monthString+"/"+dateString+"/"+yyyy;
    this.dateString=todayString;
     let d=[];
    for(var i=1;i<32;i++){
      d.push(i);
    }
    this.days=d;
  }

  ngOnInit() {

  }

  requestDhana(){
    console.log(this.date);
  }

}
