import { Component, OnInit } from "@angular/core";
import { Uf } from "../interfaces/Uf";
import { ActivatedRoute, Router } from "@angular/router";
import { UfService } from "../services/uf.service";

@Component({
  selector: "app-listar-uf",
  templateUrl: "./listar-uf.component.html",
  styleUrls: ["./listar-uf.component.css"],
})
export class ListarUfComponent implements OnInit {
  listaUfs: Uf[] = [];

  constructor(private service: UfService, private router: Router) {}

  ngOnInit(): void {
    this.service.listar().subscribe((listaUfs) => {
      this.listaUfs = listaUfs;
    });
  }

  adicionarUf() {
    this.router.navigate(["/ufs/criarUf"]);
  }

  editarUf(codigoUF: number | undefined) {
    if (codigoUF) {
      this.router.navigate([`/ufs/editarUf/${codigoUF}`]);
    }
  }

  cancelar() {
    this.router.navigate(["/menu"]);
  }
}
