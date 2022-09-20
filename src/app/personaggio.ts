import { Loc } from "./loc";
import { Origin } from "./origin";

export interface Personaggio {
    id:number;
    name:string;
    status:string;
    species:string;
    type:string;
    gender:string;
    origin:Origin;
    location:Loc;
    image:string;
    episode:[];
    url:string;
    created:string
    //TODO
}
