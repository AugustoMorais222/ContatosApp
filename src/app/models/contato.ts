import { ContatoGrupo } from "./contato-grupo";
import { Grupo } from "./grupo";

export interface Contato {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    grupos?: ContatoGrupo[];    
    isFavorite?: boolean; 
}
