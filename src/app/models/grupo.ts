import { Contato } from "./contato";

export interface Grupo {
    id?:number;
    nome?:string;
    contatos?: Contato[];
    
}
