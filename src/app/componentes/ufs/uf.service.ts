import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Uf } from './Uf';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UfService {

   private readonly API = 'http://localhost:3333/uf'

  constructor(private http: HttpClient) { }

  listar(): Observable<Uf[]> {
    return this.http.get<Uf[]>(this.API)
  }

  criar(uf: Uf): Observable<Uf> {
    return this.http.post<Uf>(this.API, uf)
  }

  editar(uf: Uf): Observable<Uf> {
    return this.http.put<Uf>(this.API, uf )
  }

  excluir(codigoUF: number): Observable<Uf> {
    const url = `${this.API}/${codigoUF}`
    return this.http.delete<Uf>(url)
  }

  buscarPorCodigoUF(codigoUf: number): Observable<Uf> {
    const url = `${this.API}?codigoUF=${codigoUf}`
    return this.http.get<Uf>(url)
  }
}
