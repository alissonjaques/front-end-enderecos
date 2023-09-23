import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { UfService } from "../services/uf.service";
import { Siglas } from "src/app/utils/Siglas";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-editar-uf",
  templateUrl: "./editar-uf.component.html",
  styleUrls: ["./editar-uf.component.css"],
})
export class EditarUfComponent implements OnInit {
  formulario!: FormGroup;
  siglas = Siglas;

  constructor(
    private service: UfService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const codigoUF = this.route.snapshot.paramMap.get("codigoUF");
    this.service.buscarPorCodigoUF(parseInt(codigoUF!)).subscribe((uf) => {
      this.formulario = this.formBuilder.group({
        codigoUF: [uf.codigoUF],
        sigla: [uf.sigla],
        nome: [
          uf.nome,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(60),
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
        status: [uf.status],
      });
    });
  }

  editarUf(): void {
    if (this.formulario.valid) {
      this.formulario.value.status = Number(this.formulario.value.status);
      this.service.editar(this.formulario.value).subscribe({
        next: () => {
          this.router.navigate(["/ufs"]);
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
    this.router.navigate(["/ufs"]);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return "botao";
    }
    return "botao__desabilitado";
  }
}
