import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioContatosComponent } from "./formulario-contatos/formulario-contatos.component";
import { ListaContatosComponent } from "./lista-contatos/lista-contatos.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormularioContatosComponent, ListaContatosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contatos-app';
}
