import { Routes } from '@angular/router';
import { FormularioContatosComponent } from './components/formulario-contatos/formulario-contatos.component';
import { ListaContatosComponent } from './components/lista-contatos/lista-contatos.component';
import { ContactGroupsComponent } from './components/contact-groups/contact-groups.component';
import { CompromissoComponent } from './components/compromisso/compromisso.component';

export const routes: Routes = [
  { path: '', redirectTo: '/formulario', pathMatch: 'full' },
  {path: 'lista', component: ListaContatosComponent},
  {path: 'formulario', component: FormularioContatosComponent},
  {path: 'grupos', component: ContactGroupsComponent},
  {path: 'compromisso', component: CompromissoComponent}
];
