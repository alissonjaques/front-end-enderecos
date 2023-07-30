import { Component, OnInit } from "@angular/core";
import { Uf } from "../interfaces/Uf";
import { UfService } from "../services/uf.service";
import { NavigationExtras, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Siglas } from "src/app/utils/Siglas";

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

  constructor(private service: UfService, private router: Router) {}

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
        const url = `/ufs/criarUf`;
        const parametros: NavigationExtras = {
          queryParams: { mensagem: mensagem, status: status, url: url },
        };
        this.router.navigate([`/erro`], parametros);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/ufs"]);
  }
}
