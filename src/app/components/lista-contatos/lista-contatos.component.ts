import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
@Component({
    selector: 'app-lista-contatos',
    standalone: true,
    imports: [FormsModule, CommonModule,TableModule,ToastModule,SelectModule,TagModule,DialogModule],
    template: `
  <div>
    <h3>Contatos cadastrados:</h3>

    <div>
      <label for="filtroGrupo">Filtrar por Grupo:</label>
      <select id="filtroGrupo" [(ngModel)]="grupoSelecionado" (change)="filtrarPorGrupo()">
        <option value="">Todos</option>
        <option *ngFor="let grupo of gruposDisponiveis" [value]="grupo">{{ grupo }}</option>
      </select>

      <button (click)="visualizarFavoritos()">Ver Favoritos</button>
      <button (click)="carregarContatos()">Ver Todos</button>
    </div>

    <ul *ngIf="contatosFiltrados.length > 0; else vazio">
      <li *ngFor="let contato of contatosFiltrados">
        <span *ngIf="contato.isFavorite">⭐</span> 
        {{ contato.nome }} 
        ({{ contato.grupos?.join(', ') || 'Sem grupo' }})
        <button (click)="visualizar(contato)">Visualizar</button>
        <button (click)="remover(contato.id)">Remover</button>
        <button (click)="editar(contato)">Editar</button>
        <button (click)="alternarFavorito(contato)">Favoritar/Desfavoritar</button>
      </li>
    </ul>

    <ng-template #vazio>
      <p>Nenhum contato encontrado.</p>
    </ng-template>

    <div *ngIf="boolDetalhes">
      <h4>Detalhes do contato:</h4>
      ID: {{contatoDetalhado.id}}<br />
      Nome: {{contatoDetalhado.nome}}<br />
      Email: {{contatoDetalhado.email}}<br />
      Telefone: {{contatoDetalhado.telefone}}<br />
      Favorito: {{contatoDetalhado.isFavorite ? 'Sim' : 'Não'}}<br />
      Grupos: {{contatoDetalhado.grupos?.join(', ') || 'Nenhum'}}<br />
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

        <label>Grupos:</label>
        <input [(ngModel)]="gruposEditados" name="gruposEditados" placeholder="Digite grupos separados por vírgula" /><br />

        <label>Favorito:</label>
        <input type="checkbox" [(ngModel)]="contatoEditado.isFavorite" name="isFavorite" /><br />

        <button type="submit">Salvar Alterações</button>
        <button type="button" (click)="cancelarEdicao()">Cancelar</button>
      </form>
    </div>
  </div>
<div class="card flex justify-center">

<p-dialog header="Detalhes do Contato" [modal]="true" [(ngModel)]="contatoDetalhado" [(visible)]="visible" [style]="{ width: '25rem' }">
         <div>
          <p><strong>Nome:</strong> {{ contatoDetalhado.nome }}</p>
          <p><strong>Email:</strong> {{ contatoDetalhado.email }}</p>
          <p><strong>Telefone:</strong> {{ contatoDetalhado.telefone }}</p>
        </div>
    </p-dialog>
  </div>
  <div class="card">
    <p-table [value]="contatos" dataKey="id" editMode="row" [tableStyle]="{'min-width': '50rem'}">
        <ng-template #header>
            <tr>
                <th style="width:10%">Id</th>
                <th style="width:25%">Nome</th>
                <th style="width:20%">Email</th>
                <th style="width:20%">Telefone</th>
                <th style="width:15%">Favorito</th>
                <th style="width:15%">Ações</th>
            </tr>
        </ng-template>
        <ng-template #body let-contato let-editing="editing" let-ri="rowIndex">
            <tr [pEditableRow]="contato">
                <td>
                    <p-cellEditor>
                        <ng-template #input>
                            <input
                                pInputText type="text"
                                [(ngModel)]="contato.id" />
                        </ng-template>
                        <ng-template #output>
                            {{contato.id}}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td>
                    <p-cellEditor>
                        <ng-template #input>
                            <input
                                pInputText type="text"
                                [(ngModel)]="contato.nome"
                                required />
                        </ng-template>
                        <ng-template #output>
                            {{contato.nome}}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td>
                    <p-cellEditor>
                        <ng-template #input>
                            <input
                                pInputText type="text"
                                [(ngModel)]="contato.email" />
                        </ng-template>
                        <ng-template #output>
                            {{contato.email}}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td>
                    <p-cellEditor>
                        <ng-template #input>
                            <input
                                pInputText type="text"
                                [(ngModel)]="contato.telefone"
                                required />
                        </ng-template>
                        <ng-template #output>
                            {{contato.telefone}}
                        </ng-template>
                    </p-cellEditor>
                </td>
                <td>
                 <div class="flex items-center justify-center gap-2">
                    <button
                      *ngIf="!editing"
                      pButton
                      pRipple
                      type="button"
                      text
                      (click)="alternarFavorito(contato)"
                      rounded
                      severity="secondary"
                    ><i *ngIf="!contato.isFavorite" class="pi pi-star"></i>
                      <i *ngIf="contato.isFavorite" class="pi pi-star-fill"></i></button>
                  </div>
                </td>
                <td>
            <div class="flex items-center justify-center gap-2">
                <button
                    *ngIf="!editing"
                    pButton
                    pRipple
                    type="button"
                    pInitEditableRow
                    (click)="editar(contato)"
                    text
                    rounded
                    severity="secondary"
                ><i class="pi pi-pencil"></i></button>
                <button
                    *ngIf="!editing"
                    pButton
                    pRipple
                    type="button"
                    text
                    (click)="abrirDialog(contato)"
                    rounded
                    severity="secondary"
                ><i class="pi pi-eye"></i></button>
                <button
                    *ngIf="!editing"
                    pButton
                    pRipple
                    type="button"
                    text
                    (click)="remover(contato.id)"
                    rounded
                    severity="secondary"
                ><i class="pi pi-trash"></i></button>
                <button
                    *ngIf="editing"
                    pButton
                    pRipple
                    type="button"
                    pSaveEditableRow
                    icon="pi pi-check"
                    (click)="atualizar();"
                    text
                    rounded
                    severity="secondary"
                ><i class="pi pi-check"></i></button>
                <button
                    *ngIf="editing"
                    pButton
                    pRipple
                    type="button"
                    pCancelEditableRow
                    icon="pi pi-times"

                    text
                    rounded
                    severity="secondary"
                ><i class="pi pi-times"></i></button>
            </div>
                </td>
            </tr>
        </ng-template>
    </p-table>
</div>
  `,
    styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent {
  contatos: Contato[] = [];
  contatosFiltrados: Contato[] = [];
  contatoDetalhado: Contato = { id: 0, nome: '', email: '', telefone: '', isFavorite: false, grupos: [] };
  contatoEditado: Contato = { id: 0, nome: '', email: '', telefone: '', isFavorite: false, grupos: [] };
  boolDetalhes: boolean = false;
  boolEdicao: boolean = false;
  grupoSelecionado: number | null = null;
  gruposDisponiveis: any[] = [];
  gruposEditados: string = '';
  visible: boolean = false;

  constructor(private contatoService: ContatoService) {
    this.carregarContatos();
  }

  carregarContatos() {
    this.contatoService.findAll().subscribe(contatos => {
      this.contatos = contatos;
      this.contatosFiltrados = contatos;
      this.atualizarGruposDisponiveis();
    });
  }

  visualizarFavoritos() {
    this.contatosFiltrados = this.contatos.filter(c => c.isFavorite);
  }

  alternarFavorito(contato: Contato) {
    contato.isFavorite = !contato.isFavorite;
    this.contatoService.update(contato).subscribe(() => {
    });
  }

  remover(id: number | undefined) {
    if (id !== undefined) {
      this.contatoService.delete(id).subscribe(() => {
        this.carregarContatos();
      });
    }
  }

  abrirDialog(contato: any) {
    this.contatoDetalhado = contato;
    this.visible = true;
  }

  visualizar(contato: Contato) {
    this.contatoService.findById(contato.id!).subscribe(res => {
      this.contatoDetalhado = res;
      this.boolDetalhes = true;
    });
  }

  editar(contato: Contato) {
    this.contatoEditado = { ...contato };
    this.gruposEditados = contato.grupos?.map(grupo => grupo.grupo.nome).join(', ') || '';
    this.boolEdicao = true;
    this.boolDetalhes = false;
  }

  atualizar() {
    this.contatoEditado.grupos = this.gruposEditados.split(',').map(nomeGrupo => {

      const grupoEncontrado = this.gruposDisponiveis.find(grupo => grupo.nome.trim() === nomeGrupo.trim());
      
      if (grupoEncontrado) {
        return { grupo: { id: grupoEncontrado.id } };
      } else {
        console.warn(`Grupo com o nome "${nomeGrupo.trim()}" não encontrado.`);
        return null;
      }
    }).filter(grupo => grupo !== null);

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

  filtrarPorGrupo() {
    if (this.grupoSelecionado) {
      this.contatosFiltrados = this.contatos.filter(c =>
        c.grupos?.some(grupo => grupo.grupo.id === this.grupoSelecionado)
      );
    } else {
      this.contatosFiltrados = this.contatos;
    }
  }

  atualizarGruposDisponiveis() {
    const grupos = new Set<any>();
    this.contatos.forEach(contato => {
      contato.grupos?.forEach(grupo => grupos.add(grupo.grupo));
    });
    this.gruposDisponiveis = Array.from(grupos);
  }
}