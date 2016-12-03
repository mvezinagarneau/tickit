export class Route{
    name: string;
    grade: string;
    created: Date;


    constructor(route:any) {
        this.name = route.name;
        this.grade = route.grade;
        this.created  = route.created;
    }

    
  
}