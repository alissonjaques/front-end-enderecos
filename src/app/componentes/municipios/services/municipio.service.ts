import { Municipio } from "./../interfaces/Municipio";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MunicipioService {
  private readonly API = "http://localhost:3333/municipio";

  constructor(private http: HttpClient) {}

  listar(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.API);
  }

  criar(municipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(this.API, municipio);
  }

  editar(municipio: Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(this.API, municipio);
  }

  excluir(codigoMunicipio: number): Observable<Municipio> {
    const url = `${this.API}/${codigoMunicipio}`;
    return this.http.delete<Municipio>(url);
  }

  buscarPorCodigoMunicipio(codigoMunicipio: number): Observable<Municipio> {
    const url = `${this.API}?codigoMunicipio=${codigoMunicipio}`;
    return this.http.get<Municipio>(url);
  }
}
