export class User {
    name: string;
    email: string;


    constructor(userInfo:any) {
        this.name = userInfo.name;
        this.email = userInfo.email;
    }


    save() {
        // HTTP request would go here
        console.log(this.name, this.email);
    }

    get() {
        console.log(this.name, this.email);
    }
}