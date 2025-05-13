import { Contato } from "./contato";

export interface Compromisso {
    id?: number;
    titulo?: string;
    descricao?: string;
    data?: Date;
    local?: string;
    contato?: Contato;
  }
  