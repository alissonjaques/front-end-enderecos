import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bairro } from "../interfaces/Bairro";

@Injectable({
  providedIn: "root",
})
export class BairroService {
  private readonly API = "http://localhost:3333/bairro";

  constructor(private http: HttpClient) {}

  listar(): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(this.API);
  }

  criar(bairro: Bairro): Observable<Bairro> {
    return this.http.post<Bairro>(this.API, bairro);
  }

  editar(bairro: Bairro): Observable<Bairro> {
    return this.http.put<Bairro>(this.API, bairro);
  }

  excluir(codigoBairro: number): Observable<Bairro> {
    const url = `${this.API}/${codigoBairro}`;
    return this.http.delete<Bairro>(url);
  }

  buscarPorCodigoBairro(codigoBairro: number): Observable<Bairro> {
    const url = `${this.API}?codigoBairro=${codigoBairro}`;
    return this.http.get<Bairro>(url);
  }
}
