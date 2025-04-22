import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/formulario', pathMatch: 'full' },
  {
    path: 'lista',
    loadComponent: () =>
      import('./lista-contatos/lista-contatos.component').then(m => m.ListaContatosComponent)
  },
  {
    path: 'formulario',
    loadComponent: () =>
      import('./formulario-contatos/formulario-contatos.component').then(m => m.FormularioContatosComponent)
  }
];
