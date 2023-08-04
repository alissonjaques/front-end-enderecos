import { Component, OnInit } from "@angular/core";
import { Bairro } from "../interfaces/Bairro";
import { Municipio } from "../../municipios/interfaces/Municipio";
import { MunicipioService } from "../../municipios/services/municipio.service";
import { BairroService } from "../services/bairro.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-editar-bairro",
  templateUrl: "./editar-bairro.component.html",
  styleUrls: ["./editar-bairro.component.css"],
})
export class EditarBairroComponent implements OnInit {
  bairro: Bairro = {
    codigoMunicipio: 0,
    nome: "",
    status: 0,
  };

  listaMunicipios: Municipio[] = [];

  constructor(
    private service: BairroService,
    private municipioService: MunicipioService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const codigoBairro = this.route.snapshot.paramMap.get("codigoBairro");
    this.service
      .buscarPorCodigoBairro(parseInt(codigoBairro!))
      .subscribe((bairro) => {
        this.bairro = bairro;
      });
    this.municipioService.listar().subscribe((listaMunicipios) => {
      this.listaMunicipios = listaMunicipios;
    });
  }

  editarBairro() {
    this.bairro.status = Number(this.bairro.status);
    this.bairro.codigoMunicipio = Number(this.bairro.codigoMunicipio);
    this.service.editar(this.bairro).subscribe(
      () => {
        this.router.navigate(["/bairros"]);
      },
      (error: HttpErrorResponse) => {
        const mensagem = encodeURIComponent(error.error.mensagem);
        const status = encodeURIComponent(error.error.status);
        openErrorDialog(this.dialog, mensagem, status);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/bairros"]);
  }
}
