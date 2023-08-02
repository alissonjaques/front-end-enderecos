import { Component, OnInit } from "@angular/core";
import { Bairro } from "../interfaces/Bairro";
import { BairroService } from "../services/bairro.service";
import { MunicipioService } from "../../municipios/services/municipio.service";
import { NavigationExtras, Router } from "@angular/router";
import { Municipio } from "../../municipios/interfaces/Municipio";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-criar-bairro",
  templateUrl: "./criar-bairro.component.html",
  styleUrls: ["./criar-bairro.component.css"],
})
export class CriarBairroComponent implements OnInit {
  bairro: Bairro = {
    codigoMunicipio: 0,
    nome: "",
    status: 0,
  };

  listaMunicipios: Municipio[] = [];

  constructor(
    private service: BairroService,
    private municipioService: MunicipioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.municipioService.listar().subscribe((listaMunicipios) => {
      this.listaMunicipios = listaMunicipios;
    });
  }

  criarBairro() {
    this.bairro.status = Number(this.bairro.status);
    this.bairro.codigoMunicipio = Number(this.bairro.codigoMunicipio);
    this.service.criar(this.bairro).subscribe(
      () => {
        this.router.navigate(["/bairros"]);
      },
      (error: HttpErrorResponse) => {
        const mensagem = encodeURIComponent(error.error.mensagem);
        const status = encodeURIComponent(error.error.status);
        const url = `/bairros/criarBairro`;
        const parametros: NavigationExtras = {
          queryParams: { mensagem: mensagem, status: status, url: url },
        };
        this.router.navigate([`/erro`], parametros);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/bairros"]);
  }
}