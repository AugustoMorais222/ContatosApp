import { Component } from '@angular/core';
import { ContatoService } from '../services/contato.service';
import { Contato } from '../models/contato';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-contatos',
  imports: [FormsModule],
  template: `
    <div>
      <h2>Nome: </h2>
      <input type="text" [(ngModel)]="this.nome" placeholder="Digite o nome do contato"/>
    </div>
    <div>
      <h2>Email: </h2>
      <input type="text" [(ngModel)]="this.email" placeholder="Digite o email do contato"/>
    </div>
    <div>
      <h2>Telefone: </h2>
      <input type="text" [(ngModel)]="this.telefone" placeholder="Digite o telefone do contato"/>
    </div>
    <div>
      <button (click)="adicionar()">Salvar</button>
    </div>
    
  `,
  styleUrl: './formulario-contatos.component.css'
})
export class FormularioContatosComponent {
  nome = "";
  email = "";
  telefone = "";
  adicionar(): void {
    this.contatoService.addContato(
      {
        id: 0, 
        nome: this.nome,
        email: this.email,
        telefone: this.telefone
      }
    );
  }

  constructor(private contatoService: ContatoService) { }

}
