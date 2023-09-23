import { Component, OnInit } from "@angular/core";
import { MunicipioService } from "../services/municipio.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Uf } from "../../ufs/interfaces/Uf";
import { UfService } from "../../ufs/services/uf.service";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-criar-municipio",
  templateUrl: "./criar-municipio.component.html",
  styleUrls: ["./criar-municipio.component.css"],
})
export class CriarMunicipioComponent implements OnInit {
  formulario!: FormGroup;
  listaUfs$: Observable<Uf[]> = this.ufService.listar();

  constructor(
    private service: MunicipioService,
    private ufService: UfService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigoUF: ["", Validators.compose([Validators.required])],
      nome: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(256),
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      status: ["", Validators.compose([Validators.required])],
    });
  }

  criarMunicipio(): void {
    if (this.formulario.valid) {
      this.formulario.value.status = Number(this.formulario.value.status);
      this.formulario.value.codigoUF = Number(this.formulario.value.codigoUF);
      this.service.criar(this.formulario.value).subscribe({
        next: () => {
          this.router.navigate(["/municipios"]);
        },
        error: (erro: HttpErrorResponse) => {
          const mensagem = encodeURIComponent(erro.error.mensagem);
          const status = encodeURIComponent(erro.error.status);
          openErrorDialog(this.dialog, mensagem, status);
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(["/municipios"]);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return "botao";
    }
    return "botao__desabilitado";
  }
}
