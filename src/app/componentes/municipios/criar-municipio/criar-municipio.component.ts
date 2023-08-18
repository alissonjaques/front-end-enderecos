import { Component, OnInit } from "@angular/core";
import { MunicipioService } from "../services/municipio.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Uf } from "../../ufs/interfaces/Uf";
import { UfService } from "../../ufs/services/uf.service";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-criar-municipio",
  templateUrl: "./criar-municipio.component.html",
  styleUrls: ["./criar-municipio.component.css"],
})
export class CriarMunicipioComponent implements OnInit {
  formulario!: FormGroup;
  listaUfs: Uf[] = [];

  constructor(
    private service: MunicipioService,
    private ufService: UfService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ufService.listar().subscribe((listaUfs) => {
      this.listaUfs = listaUfs;
    });
    this.formulario = this.formBuilder.group({
      codigoUF: ["", Validators.compose([Validators.required])],
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

  criarMunicipio() {
    if (this.formulario.valid) {
      this.formulario.value.status = Number(this.formulario.value.status);
      this.formulario.value.codigoUF = Number(this.formulario.value.codigoUF);
      this.service.criar(this.formulario.value).subscribe(
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
  }

  cancelar() {
    this.router.navigate(["/municipios"]);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return "botao";
    }
    return "botao__desabilitado";
  }
}
