import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private baseUrl = `http://localhost:${environment.port}/grupos`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.baseUrl);
  }

  findById(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.baseUrl}/${id}`);
  }

  save(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.baseUrl, grupo);
  }

  update(grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(this.baseUrl, grupo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}