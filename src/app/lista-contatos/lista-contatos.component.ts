import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContatoService } from '../services/contato.service';
import { Contato } from '../models/contato';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <div>
    <h3>Contatos cadastrados:</h3>
    <ul *ngIf="contatos.length > 0; else vazio">
      <li *ngFor="let contato of contatos">
        {{ contato.nome }} 
        <button (click)="visualizar(contato)">Visualizar</button>
        <button (click)="remover(contato.id)">Remover</button> 
      </li>
    </ul>
    <ng-template #vazio>
      <p>Nenhum contato cadastrado ainda.</p>
    </ng-template>

    <div *ngIf="boolDetalhes">
      <h4>Detalhes do contato:</h4>
      ID: {{contatoDetalhado.id}}<br />
      Nome: {{contatoDetalhado.nome}}<br />
      Email: {{contatoDetalhado.email}}<br />
      Telefone: {{contatoDetalhado.telefone}}<br />
      <button (click)="fecharDetalhes()">Fechar</button>
    </div>
  </div>
  `,
  styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent {
  contatos: Contato[] = [];
  contatoDetalhado: Contato = { id: 0, nome: '', email: '', telefone: '' };
  boolDetalhes: boolean = false;

  constructor(private contatoService: ContatoService) {
    this.carregarContatos();
  }

  carregarContatos() {
    this.contatoService.findAll().subscribe(contatos => this.contatos = contatos);
  }

  remover(id: number | undefined) {
    if (id !== undefined) {
      this.contatoService.delete(id).subscribe(() => {
        this.carregarContatos();
      });
    }
  }

  visualizar(contato: Contato) {
    this.contatoService.findById(contato.id!).subscribe(res => {
      this.contatoDetalhado = res;
      this.boolDetalhes = true;
    });
  }

  fecharDetalhes() {
    this.boolDetalhes = false;
  }
}
