export class DhanaRequest {


    constructor(public firstname: string,
        public lastName: string,
        public email: string,
        public dayOfMonth: number,
        public specialNotes: string) { }

    getFullName():string{
        return this.firstname+' '+this.lastName;
    }
}