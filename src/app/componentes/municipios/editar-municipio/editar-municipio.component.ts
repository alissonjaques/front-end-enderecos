import { Component, OnInit } from "@angular/core";
import { Municipio } from "../interfaces/Municipio";
import { Uf } from "../../ufs/interfaces/Uf";
import { MunicipioService } from "../services/municipio.service";
import { UfService } from "../../ufs/services/uf.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-editar-municipio",
  templateUrl: "./editar-municipio.component.html",
  styleUrls: ["./editar-municipio.component.css"],
})
export class EditarMunicipioComponent implements OnInit {
  formulario!: FormGroup;
  listaUfs: Uf[] = [];

  constructor(
    private service: MunicipioService,
    private ufService: UfService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const codigoMunicipio = this.route.snapshot.paramMap.get("codigoMunicipio");
    this.service
      .buscarPorCodigoMunicipio(parseInt(codigoMunicipio!))
      .subscribe((municipio) => {
        this.formulario = this.formBuilder.group({
          codigoMunicipio: [municipio.codigoMunicipio],
          codigoUF: [municipio.codigoUF],
          nome: [
            municipio.nome,
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(256),
              Validators.pattern(/(.|\s)*\S(.|\s)*/),
            ]),
          ],
          status: [municipio.status],
        });
      });
    this.ufService.listar().subscribe((listaUfs) => {
      this.listaUfs = listaUfs;
    });
  }

  editarMunicipio(): void {
    if (this.formulario.valid) {
      this.formulario.value.status = Number(this.formulario.value.status);
      this.formulario.value.codigoUF = Number(this.formulario.value.codigoUF);
      this.service.editar(this.formulario.value).subscribe({
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
