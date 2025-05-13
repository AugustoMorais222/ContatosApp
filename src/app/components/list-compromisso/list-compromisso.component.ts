import { Component, OnInit} from '@angular/core';
import { CompromissoService } from '../../services/compromisso.service';
import { Compromisso } from '../../models/compromisso';
import { AccordionModule } from 'primeng/accordion';
import { AccordionTab } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-compromisso',
  imports: [AccordionModule,AccordionTab,CardModule,FormsModule,CommonModule],
  template:`
    <p-accordion>
  <p-accordionTab *ngFor="let data of obterDatas()" [header]="'Data: ' + data">
    <div *ngFor="let c of compromissosAgrupados[data]" class="mb-3">
      <p-card>
        <ng-template pTemplate="header">
          {{ c.titulo }}
        </ng-template>
        <div><strong>Descrição:</strong> {{ c.descricao }}</div>
        <div><strong>Data:</strong> {{ c.data | date:'short' }}</div>
        <div><strong>Local:</strong> {{ c.local }}</div>
      </p-card>
    </div>
  </p-accordionTab>
</p-accordion>

  
  `,
  styleUrl: './list-compromisso.component.css'
})
export class ListCopromissoComponent implements OnInit {

  compromissosAgrupados: { [data: string]: Compromisso[] } = {};

  constructor(private compromissoService: CompromissoService) {}

  ngOnInit(): void {
    this.compromissoService.findAll().subscribe(compromissos => {
      this.compromissosAgrupados = this.agruparPorData(compromissos);
    });
  }

  private agruparPorData(compromissos: Compromisso[]): { [data: string]: Compromisso[] } {
    const agrupados: { [data: string]: Compromisso[] } = {};

    compromissos.forEach(c => {
      const dataFormatada = new Date(c.data ?? '').toLocaleDateString('pt-BR');
      if (!agrupados[dataFormatada]) {
        agrupados[dataFormatada] = [];
      }
      agrupados[dataFormatada].push(c);
    });

    return agrupados;
  }

  obterDatas(): string[] {
    return Object.keys(this.compromissosAgrupados);
  }
}
