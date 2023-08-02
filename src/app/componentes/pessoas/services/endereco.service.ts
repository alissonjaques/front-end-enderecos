import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Endereco } from "../interfaces/Endereco";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EnderecoService {
  private readonly API = "http://localhost:3333/endereco";

  constructor(private http: HttpClient) {}

  listar(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API);
  }

  buscarPorCodigoPessoa(codigoPessoa: number): Observable<Endereco[]> {
    const url = `${this.API}?codigoPessoa=${codigoPessoa}`;
    return this.http.get<Endereco[]>(url);
  }
}
