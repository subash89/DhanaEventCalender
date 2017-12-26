export class DhanaRequest {


    constructor(public firstName: string,
        public lastName: string,
        public email: string,
        public mobile: string,
        public specialNotes: string) { }

    getFullName():string{
        return this.firstName+' '+this.lastName;
    }
}


export class ReccurringDhanaRequest extends DhanaRequest{
    public dayOfMonth: number
    constructor( fName: string,
         lname: string,
         _email: string,
         _mobile: string,
         _specialNotes: string,
        _dayofMonth:number){
        super(fName,lname,_email,_mobile,_specialNotes);
        this.dayOfMonth=_dayofMonth;
 
    }

}


export class UpdateDhanaRequest extends DhanaRequest{
    public date: Date
    constructor( fName: string,
         lname: string,
         _email: string,
         _mobile: string,
         _specialNotes: string,
        _date:Date){
        super(fName,lname,_email,_mobile,_specialNotes);
        this.date=_date;
 
    }

}