export class DhanaRequest {


    constructor(public firstName: string,
        public lastName: string,
        public email: string,
        public dayOfMonth: number,
        public specialNotes: string) { }

    getFullName():string{
        return this.firstName+' '+this.lastName;
    }
}