import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  contatos: Contato[] = [];

  constructor() {}

  addContato(contato: Contato) {
    const id = this.contatos.length;
    contato.id = id;
    this.contatos.push(contato);
    console.log(this.contatos);
  }

  rmvContato(id: number) {
    this.contatos = this.contatos.filter(contato => contato.id != id);
  }

  listarContatos(): Contato[] {
    return this.contatos;
  }

  buscarContatoById(id: number): Contato | undefined {
    return this.contatos.find(contato => contato.id === id);
  }

  
}
