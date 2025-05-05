import { Contato } from "./contato";

export interface Compromisso {
    id?: number;
    titulo: string;
    descricao: string;
    dataHora: Date;
    local: string;
    contatoAssociado?: Contato;
}
