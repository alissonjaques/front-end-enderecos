import { catchError } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Uf } from "../interfaces/Uf";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { UfService } from "../services/uf.service";

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

  constructor(
    private service: UfService,
    private router: Router,
    private route: ActivatedRoute
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
        const url = `/ufs/${this.uf.codigoUF}`;
        const parametros: NavigationExtras = {
          queryParams: { mensagem: mensagem, status: status, url: url },
        };
        this.router.navigate([`/erro`], parametros);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/ufs"]);
  }
}
