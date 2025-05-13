import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compromisso } from '../models/compromisso';
import { Observable } from 'rxjs';
import { environment } from '../environment';


@Injectable({
  providedIn: 'root'
})
export class CompromissoService {

  private readonly API = `http://localhost:${environment.port}/compromisso`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Compromisso[]> {
    return this.http.get<Compromisso[]>(this.API);
  }

  findById(id: number): Observable<Compromisso> {
    return this.http.get<Compromisso>(`${this.API}/${id}`);
  }

  insert(compromisso: Compromisso): Observable<Compromisso> {
    return this.http.post<Compromisso>(this.API, compromisso);
  }

  update(compromisso: Compromisso): Observable<Compromisso> {
    return this.http.put<Compromisso>(`${this.API}/${compromisso.id}`, compromisso);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
