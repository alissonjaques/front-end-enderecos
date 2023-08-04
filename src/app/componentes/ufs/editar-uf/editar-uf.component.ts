import { Component, OnInit } from "@angular/core";
import { Uf } from "../interfaces/Uf";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { UfService } from "../services/uf.service";
import { Siglas } from "src/app/utils/Siglas";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-editar-uf",
  templateUrl: "./editar-uf.component.html",
  styleUrls: ["./editar-uf.component.css"],
})
export class EditarUfComponent implements OnInit {
  uf: Uf = {
    codigoUF: 0,
    sigla: "",
    nome: "",
    status: 0,
  };

  siglas = Siglas;

  constructor(
    private service: UfService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const codigoUF = this.route.snapshot.paramMap.get("codigoUF");
    this.service.buscarPorCodigoUF(parseInt(codigoUF!)).subscribe((uf) => {
      this.uf = uf;
    });
  }

  editarUf() {
    this.uf.status = Number(this.uf.status);
    this.service.editar(this.uf).subscribe(
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

  cancelar() {
    this.router.navigate(["/ufs"]);
  }
}
