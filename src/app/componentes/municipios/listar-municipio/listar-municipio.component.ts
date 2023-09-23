import { UfService } from "./../../ufs/services/uf.service";
import { Component, OnInit } from "@angular/core";
import { MunicipioService } from "../services/municipio.service";
import { Router } from "@angular/router";
import { MunicipioCompleto } from "../interfaces/MunicipioCompleto";
import { Observable, map } from "rxjs";
import { Municipio } from "../interfaces/Municipio";

@Component({
  selector: "app-listar-municipio",
  templateUrl: "./listar-municipio.component.html",
  styleUrls: ["./listar-municipio.component.css"],
})
export class ListarMunicipioComponent implements OnInit {
  listaMunicipios$: Observable<MunicipioCompleto[]> = this.service
    .listar()
    .pipe(
      map((listaMunicipios) => this.getMunicipiosCompletos(listaMunicipios))
    );

  constructor(
    private service: MunicipioService,
    private ufService: UfService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getMunicipiosCompletos(listaMunicipios: Municipio[]): MunicipioCompleto[] {
    const municipios: MunicipioCompleto[] = [];
    listaMunicipios.map((municipio) => {
      this.ufService.buscarPorCodigoUF(municipio.codigoUF).subscribe((uf) => {
        municipios.push({
          codigoMunicipio: municipio.codigoMunicipio,
          uf: uf,
          nome: municipio.nome,
          status: municipio.status,
        });
      });
    });
    return municipios;
  }

  adicionarMunicipio(): void {
    this.router.navigate(["/municipios/criarMunicipio"]);
  }

  editarMunicipio(codigoMunicipio: number | undefined): void {
    if (codigoMunicipio) {
      this.router.navigate([`/municipios/editarMunicipio/${codigoMunicipio}`]);
    }
  }

  cancelar(): void {
    this.router.navigate(["/menu"]);
  }
}
