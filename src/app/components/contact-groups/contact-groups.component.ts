import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grupo } from '../../models/grupo';
import { GrupoService } from '../../services/grupo.service';


@Component({
  selector: 'app-contact-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div>
    <h3>Gerenciar Grupos</h3>

    <div>
      <label for="nomeGrupo">Nome do Grupo:</label>
      <input id="nomeGrupo" [(ngModel)]="novoGrupo.nome" placeholder="Digite o nome do grupo" />
      <button (click)="adicionarGrupo()">Adicionar Grupo</button>
    </div>

    <h4>Grupos existentes:</h4>
    <ul>
      <li *ngFor="let grupo of grupos">
        {{ grupo.nome }} ({{ getContatosCount(grupo) }} contatos)
        <button (click)="editarGrupo(grupo)">Editar</button>
        <button (click)="removerGrupo(grupo.id!)">Remover</button>
      </li>
    </ul>

    <div *ngIf="grupoEditado">
      <h4>Editar Grupo</h4>
      <form (ngSubmit)="atualizarGrupo()">
        <label for="nomeGrupoEditado">Novo nome do Grupo:</label>
        <input id="nomeGrupoEditado" [(ngModel)]="grupoEditado.nome" name="nomeGrupoEditado" required />
        <button type="submit">Salvar Alterações</button>
        <button type="button" (click)="cancelarEdicao()">Cancelar</button>
      </form>
    </div>
  </div>
  `,
  styleUrls: ['./contact-groups.component.css']
})
export class ContactGroupsComponent {
  grupos: Grupo[] = [];
  novoGrupo: Grupo = { nome: '' };
  grupoEditado: Grupo | null = null;

  constructor(private grupoService: GrupoService) {
    this.carregarGrupos();
  }

  carregarGrupos() {
    this.grupoService.findAll().subscribe(grupos => {
      this.grupos = grupos;
    });
  }

  adicionarGrupo() {
    if (this.novoGrupo.nome!.trim()) {
      this.grupoService.save(this.novoGrupo).subscribe({
        next: (res) => {
          this.grupos.push(res);
          this.novoGrupo = { nome: '' };
        },
        error: (err) => console.error('Erro ao adicionar grupo:', err)
      });
    }
  }

  editarGrupo(grupo: Grupo) {
    this.grupoEditado = { ...grupo };
  }

  atualizarGrupo() {
    if (this.grupoEditado) {
      this.grupoService.update(this.grupoEditado).subscribe({
        next: (res) => {
          const index = this.grupos.findIndex(g => g.id === res.id);
          if (index !== -1) {
            this.grupos[index] = res;
          }
          this.grupoEditado = null;
        },
        error: (err) => console.error('Erro ao atualizar grupo:', err)
      });
    }
  }

  cancelarEdicao() {
    this.grupoEditado = null;
  }

  removerGrupo(id: number) {
    this.grupoService.delete(id).subscribe({
      next: () => {
        this.grupos = this.grupos.filter(grupo => grupo.id !== id);
      },
      error: (err) => console.error('Erro ao remover grupo:', err)
    });
  }

  getContatosCount(grupo: Grupo): number {
    return grupo.contatos ? grupo.contatos.length : 0;
  }
}

