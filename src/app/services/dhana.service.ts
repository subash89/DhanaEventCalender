import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DhanaRequest } from '../models/DhanaRequest';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DhanaService {

  constructor(private http:HttpClient) { }
  addDhana(request: DhanaRequest): Promise<any>{

     let fullName=request.getFullName();
    let event={
      "summary": "Dhawal Dhanaya by "+fullName,
      "location": "temple",
      "description": "Dhawal Dhanaya offered by "+fullName,
      "start": {
        "date": "2018-01-"+request.dayOfMonth
      },
      "end": {
        "date": "2018-01-"+request.dayOfMonth
      }
    ,
      "recurrence": [
        "RRULE:FREQ=MONTHLY;BYMONTHDAY="+request.dayOfMonth+";INTERVAL=1"
      ]
    };
    return this.http.put('/calender/event',event).toPromise();

   }
}
