import { Component } from '@angular/core';
import { ContatoService } from '../../services/contato.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Grupo } from '../../models/grupo';
import { CommonModule } from '@angular/common';
import { GrupoService } from '../../services/grupo.service';
import { OnInit } from '@angular/core';
import { ContatoGrupoService } from '../../services/contato-grupo.service';

@Component({
  selector: 'app-formulario-contatos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h2>Nome:</h2>
      <input type="text" [(ngModel)]="nome" placeholder="Digite o nome do contato"/>
    </div>
    <div>
      <h2>Email:</h2>
      <input type="text" [(ngModel)]="email" placeholder="Digite o email do contato"/>
    </div>
    <div>
      <h2>Telefone:</h2>
      <input type="text" [(ngModel)]="telefone" placeholder="Digite o telefone do contato"/>
    </div>
    <div>
      <h2>Grupos:</h2>
      <select multiple [(ngModel)]="gruposSelecionados" name="grupos">
        <option *ngFor="let grupo of todosGrupos" [ngValue]="grupo">{{ grupo.nome }}</option>
      </select>
    </div>
    <div>
      <label>
        <input type="checkbox" [(ngModel)]="isFavorite" />
        Favorito
      </label>
    </div>
    <div>
      <button (click)="adicionar()">Salvar</button>
    </div>
  `,
  styleUrl: './formulario-contatos.component.css'
})
export class FormularioContatosComponent implements OnInit{
  nome = "";
  email = "";
  telefone = "";
  isFavorite = false;

  gruposSelecionados: Grupo[] = [];
  
  todosGrupos: Grupo[] = [];

  constructor(
    private contatoService: ContatoService,
    private grupoService: GrupoService,
    private contatoGrupoService: ContatoGrupoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.grupoService.findAll().subscribe(grupos => {
      this.todosGrupos = grupos;
    });
  }
  

  adicionar() {
    const novoContato = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      isFavorite: this.isFavorite
    };
  
    this.contatoService.save(novoContato).subscribe(res => {
      const contatoId = res.id!;
      alert("Contato salvo com sucesso!");

      this.gruposSelecionados.forEach(grupo => {
        this.contatoGrupoService.adicionarContatoNoGrupo({
          contatoId: contatoId,
          grupoId: grupo.id!
        }).subscribe(() => {
          console.log(`Contato ${contatoId} associado ao grupo ${grupo.nome}`);
        }, err => {
          console.error(`Erro ao associar contato ${contatoId} ao grupo ${grupo.nome}`, err);
        });
      });
  
      this.router.navigateByUrl('/lista');
    }, err => {
      console.error("Erro ao salvar contato", err);
      alert("Erro ao salvar contato!");
    });
  }
  
  
}
