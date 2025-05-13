import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../environment';
import { Grupo } from '../models/grupo';
import { Compromisso } from '../models/compromisso';
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  contatos: Contato[] = [];

  url: string = `http://localhost:${environment.port}/contato`;
  
  constructor(private http: HttpClient) {}

  findAll(): Observable<Contato[]>{
    return this.http.get<Contato[]>(this.url)
  }

  findById(id: number): Observable<Contato>{
    return this.http.get<Contato>(this.url+'/'+id);
  }

  save(contato: Contato): Observable<Contato>{
    return this.http.post<Contato>(this.url, contato);
  }

  update(contato: Contato): Observable<Contato>{
    return this.http.put<Contato>(this.url, contato);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }

  findGruposByContato(id: number): Observable<Grupo[]>{
    return this.http.get<Grupo[]>(this.url+ '/' + id + '/grupos')
  }

  findCompromissosByContato(id: number): Observable<Compromisso[]>{
    return this.http.get<Compromisso[]>(this.url+ '/' + id + '/compromissos')
  }
  
}
