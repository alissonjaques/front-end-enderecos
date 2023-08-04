import { Component, OnInit } from "@angular/core";
import { MunicipioService } from "../services/municipio.service";
import { Municipio } from "../interfaces/Municipio";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Uf } from "../../ufs/interfaces/Uf";
import { UfService } from "../../ufs/services/uf.service";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-criar-municipio",
  templateUrl: "./criar-municipio.component.html",
  styleUrls: ["./criar-municipio.component.css"],
})
export class CriarMunicipioComponent implements OnInit {
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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ufService.listar().subscribe((listaUfs) => {
      this.listaUfs = listaUfs;
    });
  }

  criarMunicipio() {
    this.municipio.status = Number(this.municipio.status);
    this.municipio.codigoUF = Number(this.municipio.codigoUF);
    this.service.criar(this.municipio).subscribe(
      () => {
        this.router.navigate(["/municipios"]);
      },
      (error: HttpErrorResponse) => {
        const mensagem = encodeURIComponent(error.error.mensagem);
        const status = encodeURIComponent(error.error.status);
        openErrorDialog(this.dialog, mensagem, status);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/municipios"]);
  }
}
