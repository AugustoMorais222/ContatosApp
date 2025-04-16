import { Component } from '@angular/core';
import { ContatoService } from '../services/contato.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-contatos',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div>
      <h2>Nome: </h2>
      <input type="text" [(ngModel)]="nome" placeholder="Digite o nome do contato"/>
    </div>
    <div>
      <h2>Email: </h2>
      <input type="text" [(ngModel)]="email" placeholder="Digite o email do contato"/>
    </div>
    <div>
      <h2>Telefone: </h2>
      <input type="text" [(ngModel)]="telefone" placeholder="Digite o telefone do contato"/>
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

  constructor(private contatoService: ContatoService, private router: Router) {}

  adicionar() {
    const novoContato = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone
    };

    this.contatoService.save(novoContato).subscribe(res => {
      alert("Contato salvo com sucesso!");
      this.router.navigateByUrl('/lista'); // redireciona para a listagem, se desejar
    }, err => {
      console.error("Erro ao salvar contato", err);
      alert("Erro ao salvar contato!");
    });
  }
}
