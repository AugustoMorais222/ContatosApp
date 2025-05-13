import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  template: `
  <h1>Cadastro App</h1>
  <div style="display:flex; margin-bottom:25px">
  <nav>
    <a routerLink="/formulario">Formulário</a> |
    <a routerLink="/lista">Lista</a> |
    <a routerLink="/grupos">Grupos</a> |
    <a routerLink="/compromisso">compromisso</a> |
    <a routerLink="/listCompromisso">listCompromisso</a> |
  </nav>
  </div>
  <router-outlet></router-outlet>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contatos-app';
}
