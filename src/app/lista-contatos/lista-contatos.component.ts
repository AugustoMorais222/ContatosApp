import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContatoService } from '../services/contato.service';
import { Contato } from '../models/contato';
import { CommonModule } from '@angular/common';
import { FormularioContatosComponent } from '../formulario-contatos/formulario-contatos.component';

@Component({
  selector: 'app-lista-contatos',
  imports: [FormsModule, CommonModule],
  template: `
  <div>
  <h3>Contatos cadastrados:</h3>
  <ul *ngIf="this.contatos.length > 0; else vazio">
    <li *ngFor="let contato of this.contatos">
      {{ contato.nome }} 
      <button (click)="visualizar(contato)">Visualizar</button>
      <button (click)="remover(contato.id)">Remover</button> 
      <button (click)="editar(contato)">editar</button> 
    </li>
  </ul>
  <ng-template #vazio>
    <p>Nenhum aluno cadastrado ainda.</p>
  </ng-template>
  <div *ngIf="boolDetatlhes">
  Detalhes:
  id: {{contatoDetalhado.id}}<br\>
  nome: {{contatoDetalhado.nome}}<br\>
  email: {{contatoDetalhado.email}}<br\>
  telefone:{{contatoDetalhado.telefone}}
  </div>



</div> 
`,
  styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent {
  contatos: Contato[] = [];
  contatoDetalhado : Contato = {id: 0, nome: '', email: '', telefone: ''};

  boolDetatlhes : Boolean = false;

  remover(id: number){
    this.contatoService.rmvContato(id);
    this.contatos = this.contatoService.listarContatos();
  }

  visualizar(contato: Contato) {
    this.boolDetatlhes = true;
    this.contatoDetalhado = contato
  }

  editar(contato: Contato){
    console.log('')
  }

  constructor(private contatoService: ContatoService) {
    this.contatos = contatoService.listarContatos();
  }


}
