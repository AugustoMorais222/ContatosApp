import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ContatoService } from '../../services/contato.service';
import { CompromissoService } from '../../services/compromisso.service';
import { Contato } from '../../models/contato';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
  selector: 'app-compromisso',
  imports: [DatePickerModule,FormsModule,CardModule,ButtonModule,ToastModule,CalendarModule,DropdownModule,AutoCompleteModule],
  standalone: true,
  template:`
  <div>
  <p-button label="Teste"></p-button>
  </div>
  `,
  styleUrl: './compromisso.component.css'
})
export class CompromissoComponent implements OnInit {
  compromisso = { titulo: '', descricao: '', dataHora: new Date(), local: '', contato: null };
  contatos: Contato[] = [];

  constructor(
    private contatoService: ContatoService,
    private compromissoService: CompromissoService
  ) {}

  ngOnInit() {
    this.contatoService.findAll().subscribe(conts => this.contatos = conts);
  }

  salvar() {
    this.compromissoService.insert(this.compromisso).subscribe({
      next: () => alert("Compromisso salvo!"),
      error: err => alert("Erro ao salvar compromisso " + err)
    });
  }
  
}
