import { Injectable } from '@angular/core';
import { Contato } from '../models/contato';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  contatos: Contato[] = [];

  url: string = "http://localhost:8080/contato";
  
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
  
}
