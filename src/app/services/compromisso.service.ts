import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compromisso } from '../models/compromisso';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  url: string = `http://localhost:${environment.port}/compromisso`;
  constructor(private http: HttpClient) { }

  findAll(): Observable<Compromisso[]>{
    return this.http.get<Compromisso[]>(this.url);
  }

  findById(id: number): Observable<Compromisso>{
    return this.http.get<Compromisso>(this.url+`/${id}`);
  }

  insert(compromisso: Compromisso): Observable<Compromisso>{
    return this.http.post<Compromisso>(this.url, compromisso);
  }

  update(compromisso: Compromisso): Observable<Compromisso>{
    return this.http.put<Compromisso>(this.url, compromisso);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(this.url+`/${id}`)
  }

}
