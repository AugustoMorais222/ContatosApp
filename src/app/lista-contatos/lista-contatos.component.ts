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
        <button (click)="editar(contato)">Editar</button>
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

    <div *ngIf="boolEdicao">
      <h4>Editar Contato</h4>
      <form (ngSubmit)="atualizar()">
        <label for="nome">Nome:</label>
        <input id="nome" [(ngModel)]="contatoEditado.nome" name="nome" required /><br />

        <label for="email">Email:</label>
        <input id="email" [(ngModel)]="contatoEditado.email" name="email" type="email" required /><br />

        <label for="telefone">Telefone:</label>
        <input id="telefone" [(ngModel)]="contatoEditado.telefone" name="telefone" required /><br />

        <button type="submit">Salvar Alterações</button>
        <button type="button" (click)="cancelarEdicao()">Cancelar</button>
      </form>
    </div>
  </div>
  `,
  styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent {
  contatos: Contato[] = [];
  contatoDetalhado: Contato = { id: 0, nome: '', email: '', telefone: '' };
  contatoEditado: Contato = { id: 0, nome: '', email: '', telefone: '' };
  boolDetalhes: boolean = false;
  boolEdicao: boolean = false;

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

  editar(contato: Contato) {
    this.contatoEditado = { ...contato };
    this.boolEdicao = true; 
    this.boolDetalhes = false; 
  }

  atualizar() {
    this.contatoService.update(this.contatoEditado).subscribe({
      next: (res) => {
        console.log('Contato atualizado com sucesso!', res);
        this.boolEdicao = false;
        this.carregarContatos();
      },
      error: (err) => {
        console.error('Erro ao atualizar o contato:', err);
      }
    });
  }

  cancelarEdicao() {
    this.boolEdicao = false;
  }

  fecharDetalhes() {
    this.boolDetalhes = false;
  }
}
