import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioContatosComponent } from "./formulario-contatos/formulario-contatos.component";
import { ListaContatosComponent } from "./lista-contatos/lista-contatos.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  template: `
  <h1>Cadastro App</h1>
  <nav>
    <a routerLink="/formulario">Formulário</a> |
    <a routerLink="/list">Lista</a>
  </nav>
  <router-outlet></router-outlet>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contatos-app';
}
