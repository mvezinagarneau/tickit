export class Route{
    //$key:string;
    name: string;
    grade: string;
    color: string;
    created: number;
    archived: boolean;
    routeSetter: string;


    constructor(name:string = "", grade:string = "", color:string = "", routeSetter = "", archived:boolean = false, created:  number = new Date().getTime()) {
        //this.$key = key;
        this.name = name;
        this.grade = grade;
        this.color = color;
        this.archived = archived;
        this.created  = created;
        this.routeSetter = routeSetter;
        

    }

    
  
}