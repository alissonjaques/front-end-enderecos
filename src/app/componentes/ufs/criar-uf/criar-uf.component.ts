import { Component, OnInit } from "@angular/core";
import { Uf } from "../interfaces/Uf";
import { UfService } from "../services/uf.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Siglas } from "src/app/utils/Siglas";
import { MatDialog } from "@angular/material/dialog";
import { openErrorDialog } from "src/app/utils/openErrorDialog";

@Component({
  selector: "app-criar-uf",
  templateUrl: "./criar-uf.component.html",
  styleUrls: ["./criar-uf.component.css"],
})
export class CriarUfComponent implements OnInit {
  uf: Uf = {
    codigoUF: 0,
    sigla: "",
    nome: "",
    status: 0,
  };

  siglas = Siglas;

  constructor(
    private service: UfService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  criarUf() {
    this.uf.status = Number(this.uf.status);
    this.service.criar(this.uf).subscribe(
      () => {
        this.router.navigate(["/ufs"]);
      },
      (error: HttpErrorResponse) => {
        const mensagem = encodeURIComponent(error.error.mensagem);
        const status = encodeURIComponent(error.error.status);
        openErrorDialog(this.dialog, mensagem, status);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/ufs"]);
  }
}
