import { Component, OnInit } from "@angular/core";
import { Municipio } from "../interfaces/Municipio";
import { Uf } from "../../ufs/interfaces/Uf";
import { MunicipioService } from "../services/municipio.service";
import { UfService } from "../../ufs/services/uf.service";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-editar-municipio",
  templateUrl: "./editar-municipio.component.html",
  styleUrls: ["./editar-municipio.component.css"],
})
export class EditarMunicipioComponent implements OnInit {
  municipio: Municipio = {
    codigoUF: 0,
    nome: "",
    status: 0,
  };

  listaUfs: Uf[] = [];

  constructor(
    private service: MunicipioService,
    private ufService: UfService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const codigoMunicipio = this.route.snapshot.paramMap.get("codigoMunicipio");
    this.service
      .buscarPorCodigoMunicipio(parseInt(codigoMunicipio!))
      .subscribe((municipio) => {
        this.municipio = municipio;
      });
    this.ufService.listar().subscribe((listaUfs) => {
      this.listaUfs = listaUfs;
    });
  }

  editarMunicipio() {
    this.municipio.status = Number(this.municipio.status);
    this.municipio.codigoUF = Number(this.municipio.codigoUF);
    this.service.editar(this.municipio).subscribe(
      () => {
        this.router.navigate(["/municipios"]);
      },
      (error: HttpErrorResponse) => {
        const mensagem = encodeURIComponent(error.error.mensagem);
        const status = encodeURIComponent(error.error.status);
        const url = `/municipios/editarMunicipio/${this.municipio.codigoMunicipio}`;
        const parametros: NavigationExtras = {
          queryParams: { mensagem: mensagem, status: status, url: url },
        };
        this.router.navigate([`/erro`], parametros);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/municipios"]);
  }
}
