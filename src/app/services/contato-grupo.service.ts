import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoGrupoService {

  private apiUrl = `http://localhost:${environment.port}/contato-grupo/adicionar`;

  constructor(private http: HttpClient) { }

  adicionarContatoNoGrupo(payload: { contatoId: number; grupoId: number }) {
    return this.http.post<void>(
      `http://localhost:${environment.port}/contato-grupo/adicionar`,
      payload
    );
  }
}
