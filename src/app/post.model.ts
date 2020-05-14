export class Post {
    public title:string;
    public content:string;
    public id:string;

    constructor(title:string, content:string, id:string){
        this.title = title;
        this.content = content;
        this.id = id;
    }
}