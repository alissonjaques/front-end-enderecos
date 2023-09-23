import { Component, OnInit } from "@angular/core";
import { Municipio } from "../../municipios/interfaces/Municipio";
import { MunicipioService } from "../../municipios/services/municipio.service";
import { BairroService } from "../services/bairro.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-editar-bairro",
  templateUrl: "./editar-bairro.component.html",
  styleUrls: ["./editar-bairro.component.css"],
})
export class EditarBairroComponent implements OnInit {
  formulario!: FormGroup;
  listaMunicipios: Municipio[] = [];

  constructor(
    private service: BairroService,
    private municipioService: MunicipioService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.municipioService.listar().subscribe((listaMunicipios) => {
      this.listaMunicipios = listaMunicipios;
    });
    const codigoBairro = this.route.snapshot.paramMap.get("codigoBairro");
    this.service
      .buscarPorCodigoBairro(parseInt(codigoBairro!))
      .subscribe((bairro) => {
        this.formulario = this.formBuilder.group({
          codigoBairro: [bairro.codigoBairro],
          codigoMunicipio: [bairro.codigoMunicipio],
          nome: [
            bairro.nome,
            Validators.compose([
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(256),
              Validators.pattern(/(.|\s)*\S(.|\s)*/),
            ]),
          ],
          status: [bairro.status],
        });
      });
  }

  editarBairro() {
    if (this.formulario.valid) {
      this.formulario.value.status = Number(this.formulario.value.status);
      this.formulario.value.codigoMunicipio = Number(
        this.formulario.value.codigoMunicipio
      );
      this.service.editar(this.formulario.value).subscribe({
        next: () => {
          this.router.navigate(["/bairros"]);
        },
        error: (erro: HttpErrorResponse) => {
          const mensagem = encodeURIComponent(erro.error.mensagem);
          const status = encodeURIComponent(erro.error.status);
          openErrorDialog(this.dialog, mensagem, status);
        },
      });
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
