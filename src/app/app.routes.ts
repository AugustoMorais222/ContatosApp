import { Routes } from '@angular/router';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { FormularioContatosComponent } from './formulario-contatos/formulario-contatos.component';


export const routes: Routes = [
    { path: '', redirectTo: '/formulario', pathMatch: 'full'},
    { path: 'list', component: ListaContatosComponent},
    { path: 'formulario', component: FormularioContatosComponent},
];
