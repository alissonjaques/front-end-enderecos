import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pessoa } from "../interfaces/Pessoa";
import { PessoaCompleta } from "../interfaces/PessoaCompleta";

@Injectable({
  providedIn: "root",
})
export class PessoaService {
  private readonly API = "http://localhost:3333/pessoa";

  constructor(private http: HttpClient) {}

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.API);
  }

  criar(pessoa: PessoaCompleta): Observable<Pessoa> {
    return this.http.post<PessoaCompleta>(this.API, pessoa);
  }

  editar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.API, pessoa);
  }

  excluir(codigoPessoa: number): Observable<Pessoa> {
    const url = `${this.API}/${codigoPessoa}`;
    return this.http.delete<Pessoa>(url);
  }

  buscarPorCodigoPessoa(codigoPessoa: number): Observable<Pessoa> {
    const url = `${this.API}?codigoPessoa=${codigoPessoa}`;
    return this.http.get<Pessoa>(url);
  }
}
