import { Component, OnInit } from "@angular/core";
import { Bairro } from "../interfaces/Bairro";
import { BairroService } from "../services/bairro.service";
import { MunicipioService } from "../../municipios/services/municipio.service";
import { Router } from "@angular/router";
import { Municipio } from "../../municipios/interfaces/Municipio";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-criar-bairro",
  templateUrl: "./criar-bairro.component.html",
  styleUrls: ["./criar-bairro.component.css"],
})
export class CriarBairroComponent implements OnInit {
  formulario!: FormGroup;
  listaMunicipios: Municipio[] = [];

  constructor(
    private service: BairroService,
    private municipioService: MunicipioService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.municipioService.listar().subscribe((listaMunicipios) => {
      this.listaMunicipios = listaMunicipios;
    });
    this.formulario = this.formBuilder.group({
      codigoMunicipio: ["", Validators.compose([Validators.required])],
      nome: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      status: ["", Validators.compose([Validators.required])],
    });
  }

  criarBairro() {
    if (this.formulario.valid) {
      this.formulario.value.status = Number(this.formulario.value.status);
      this.formulario.value.codigoMunicipio = Number(
        this.formulario.value.codigoMunicipio
      );
      this.service.criar(this.formulario.value).subscribe(
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
  }

  cancelar() {
    this.router.navigate(["/bairros"]);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return "botao";
    }
    return "botao__desabilitado";
  }
}
