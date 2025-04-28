import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private baseUrl = 'http://localhost:8080/grupos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.baseUrl);
  }

  getById(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.baseUrl}/${id}`);
  }

  create(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.baseUrl, grupo);
  }

  update(grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(this.baseUrl, grupo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}