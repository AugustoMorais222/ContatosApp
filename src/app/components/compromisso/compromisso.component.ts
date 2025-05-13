import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CompromissoService } from '../../services/compromisso.service';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../models/contato';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Compromisso } from '../../models/compromisso';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-compromisso',
  imports: [ButtonModule,DatePickerModule,FormsModule,AutoCompleteModule,InputTextModule,TextareaModule,ToastModule],
  template:`
  <div class="flex-auto" style="display:flex; margin-bottom:25px">
    <label for="calendar-24h" class="font-bold block mb-2">Nome: </label>
    <input type="text" pInputText [(ngModel)]="nome" />
  </div>
  <div class="flex-auto" style="display:flex; margin-bottom:25px">
    <label for="calendar-24h" class="font-bold block mb-2">Descrição: </label>
    <textarea rows="5" cols="30" pTextarea [(ngModel)]="descricao"></textarea>
  </div>
  <div class="flex-auto" style="display:flex; margin-bottom:25px">
        <label for="calendar-24h" class="font-bold block mb-2">Data: </label>
        <p-datepicker [(ngModel)]="data" inputId="calendar-24h"[showTime]="true" [hourFormat]='"24"' />
  </div>
  <div class="flex-auto" style="display:flex; margin-bottom:25px">
    <label for="calendar-24h" class="font-bold block mb-2">Local: </label>
    <input type="text" pInputText [(ngModel)]="local" />
  </div>
  <div class="card flex justify-center" style="display:flex; margin-bottom:25px">
    <label for="calendar-24h" class="font-bold block mb-2">Contatos: </label>
    <p-autocomplete [field]="'nome'" [(ngModel)]="contatoSelecionado" [dropdown]="true" [suggestions]="contatos" (completeMethod)="carregarContatos()" />
</div>
  <div class="flex-auto" style="display:flex; margin-bottom:25px">
  <p-toast />
    <p-button label="Salvar" (onClick)="adicionar()"/>
  </div>
  `,
  styleUrl: './compromisso.component.css',
  providers: [MessageService],
})
export class CompromissoComponent {
  nome: string = ''
  descricao: string = ''
  data: Date = new Date();
  contatos: Contato[] = [];
  local: string = '';
  contatoSelecionado: Contato = {nome: '', email:'', telefone:''}
  compromisso: Compromisso = {id: 0}
  
  constructor(private compromissoService: CompromissoService, private contatoService: ContatoService, private messageService: MessageService){
    this.carregarContatos();
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Salvo com sucesso', detail: 'Salvo com sucesso' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Erro ao salvar', detail: 'Erro ao salvar compromisso' });
  }

  adicionar() {
    const novoCompromisso = {
      titulo: this.nome,
      descricao: this.descricao,
      data: this.data,
      local: this.local,
      contato: this.contatoSelecionado
    };
    console.log("conntato: "+this.contatoSelecionado.id)
    this.compromissoService.insert(novoCompromisso).subscribe(res => {
      const contatoId = res.id!;
      this.showSuccess();
    }, err => {
      console.error("Erro ao salvar compromisso", err);
      this.showError();
      
    });
  }

  carregarContatos() {
    this.contatoService.findAll().subscribe(contatos => {
      this.contatos = contatos;
    });
  }

}
