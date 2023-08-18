import { Component, OnInit } from "@angular/core";
import { Uf } from "../interfaces/Uf";
import { UfService } from "../services/uf.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Siglas } from "src/app/utils/Siglas";
import { MatDialog } from "@angular/material/dialog";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-criar-uf",
  templateUrl: "./criar-uf.component.html",
  styleUrls: ["./criar-uf.component.css"],
})
export class CriarUfComponent implements OnInit {
  formulario!: FormGroup;
  siglas = Siglas;

  constructor(
    private service: UfService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      sigla: ["", Validators.compose([Validators.required])],
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

  criarUf() {
    if (this.formulario.valid) {
      this.formulario.value.status = Number(this.formulario.value.status);
      this.service.criar(this.formulario.value).subscribe(
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
  }

  cancelar() {
    this.router.navigate(["/ufs"]);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return "botao";
    }
    return "botao__desabilitado";
  }
}
