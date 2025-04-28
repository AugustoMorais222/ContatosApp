import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/formulario', pathMatch: 'full' },
  {
    path: 'lista',
    loadComponent: () =>
      import('./components/lista-contatos/lista-contatos.component').then(m => m.ListaContatosComponent)
  },
  {
    path: 'formulario',
    loadComponent: () =>
      import('./components/formulario-contatos/formulario-contatos.component').then(m => m.FormularioContatosComponent)
  },
  {
    path: 'grupos',
    loadComponent: () =>
      import('./components/contact-groups/contact-groups.component').then(m => m.ContactGroupsComponent)
  }
];
