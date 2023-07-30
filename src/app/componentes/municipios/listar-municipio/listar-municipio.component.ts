import { UfService } from "./../../ufs/services/uf.service";
import { Component, OnInit } from "@angular/core";
import { MunicipioService } from "../services/municipio.service";
import { Router } from "@angular/router";
import { MunicipioCompleto } from "../interfaces/MunicipioCompleto";

@Component({
  selector: "app-listar-municipio",
  templateUrl: "./listar-municipio.component.html",
  styleUrls: ["./listar-municipio.component.css"],
})
export class ListarMunicipioComponent implements OnInit {
  listaMunicipios: MunicipioCompleto[] = [];

  constructor(
    private service: MunicipioService,
    private ufService: UfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.listar().subscribe((listaMunicipios) => {
      listaMunicipios.map((municipio) => {
        this.ufService.buscarPorCodigoUF(municipio.codigoUF).subscribe((uf) => {
          this.listaMunicipios.push({
            codigoMunicipio: municipio.codigoMunicipio,
            uf: uf,
            nome: municipio.nome,
            status: municipio.status,
          });
        });
      });
    });
  }

  adicionarMunicipio() {
    this.router.navigate(["/municipios/criarMunicipio"]);
  }

  editarMunicipio(codigoMunicipio: number | undefined) {
    if (codigoMunicipio) {
      this.router.navigate([`/municipios/editarMunicipio/${codigoMunicipio}`]);
    }
  }

  cancelar() {
    this.router.navigate(["/menu"]);
  }
}
