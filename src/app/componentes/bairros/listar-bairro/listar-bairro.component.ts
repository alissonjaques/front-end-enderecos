import { Component, OnInit } from "@angular/core";
import { BairroCompleto } from "../interfaces/BairroCompleto";
import { BairroService } from "../services/bairro.service";
import { MunicipioService } from "../../municipios/services/municipio.service";
import { Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { Bairro } from "../interfaces/Bairro";

@Component({
  selector: "app-listar-bairro",
  templateUrl: "./listar-bairro.component.html",
  styleUrls: ["./listar-bairro.component.css"],
})
export class ListarBairroComponent implements OnInit {
  listaBairros$: Observable<BairroCompleto[]> = this.service
    .listar()
    .pipe(map((bairros) => this.getBairrosCompletos(bairros)));

  constructor(
    private service: BairroService,
    private municipioService: MunicipioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getBairrosCompletos(bairros: Bairro[]): BairroCompleto[] {
    const listaBairrosCompletos: BairroCompleto[] = [];
    bairros.map((bairro) => {
      this.municipioService
        .buscarPorCodigoMunicipio(bairro.codigoMunicipio)
        .subscribe((municipio) => {
          listaBairrosCompletos.push({
            codigoBairro: bairro.codigoBairro,
            municipio: municipio,
            nome: bairro.nome,
            status: bairro.status,
          });
        });
    });
    return listaBairrosCompletos;
  }

  adicionarBairro(): void {
    this.router.navigate(["/bairros/criarBairro"]);
  }

  editarBairro(codigoBairro: number | undefined): void {
    if (codigoBairro) {
      this.router.navigate([`/bairros/editarBairro/${codigoBairro}`]);
    }
  }

  cancelar(): void {
    this.router.navigate(["/menu"]);
  }
}
