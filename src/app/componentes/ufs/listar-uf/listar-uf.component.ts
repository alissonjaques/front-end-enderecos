import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UfService } from "../services/uf.service";
import { EMPTY, Observable, catchError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";
import { Uf } from "../interfaces/Uf";

@Component({
  selector: "app-listar-uf",
  templateUrl: "./listar-uf.component.html",
  styleUrls: ["./listar-uf.component.css"],
})
export class ListarUfComponent implements OnInit {
  listaUfs$: Observable<Uf[]> = this.service.listar().pipe(
    catchError((error: HttpErrorResponse) => {
      const mensagem = encodeURIComponent(
        error.error.mensagem ?? "Erro interno no servidor"
      );
      const status = encodeURIComponent(error.error.status ?? "500");
      openErrorDialog(this.dialog, mensagem, status);
      return EMPTY;
    })
  );

  constructor(
    private service: UfService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  adicionarUf(): void {
    this.router.navigate(["/ufs/criarUf"]);
  }

  editarUf(codigoUF: number | undefined): void {
    if (codigoUF) {
      this.router.navigate([`/ufs/editarUf/${codigoUF}`]);
    }
  }

  cancelar(): void {
    this.router.navigate(["/menu"]);
  }
}
