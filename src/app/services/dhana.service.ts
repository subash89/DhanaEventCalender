import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UpdateDhanaRequest, ReccurringDhanaRequest } from '../models/DhanaRequest';
import { Observable } from 'rxjs/Observable';
const am_11:number=60*60*11*1000;
const pm_1:number=60*60*13*1000;

@Injectable()
export class DhanaService {

  constructor(private http:HttpClient) { }
  addDhana(request: ReccurringDhanaRequest): Promise<any>{

    let baseDate= new Date("2018-01-"+request.dayOfMonth);
    let startDate=new Date(baseDate.getTime()+am_11);
    let endDate=new Date(baseDate.getTime()+pm_1);


      

     let fullName=request.getFullName();
    let event={
      'metaData':request,
      'googleCalenderEvent':{
      "summary": fullName,
      "location": "temple",
      "description": fullName,
      "start": {
        "dateTime":startDate.toISOString(),
        'timeZone': 'America/New_York'
      },
      "end": {
        "dateTime": endDate.toISOString(),
        'timeZone': 'America/New_York'
      }
    ,
      "recurrence": [
        "RRULE:FREQ=MONTHLY;BYMONTHDAY="+request.dayOfMonth+";INTERVAL=1"
      ]
    }};
    return this.http.put('/calender/event',event).toPromise();

   }

   requestDhana(request: UpdateDhanaRequest): Promise<any>{


    return this.http.post('/calender/request/event',request).toPromise();

   }

   approveDhana(key:string):Promise<any>{

     return this.http.get('/calender/request/approve?key='+key).toPromise();


   }
}
