import { Component, OnInit } from "@angular/core";
import { Pessoa } from "../interfaces/Pessoa";
import { PessoaService } from "../services/pessoa.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-listar-pessoa",
  templateUrl: "./listar-pessoa.component.html",
  styleUrls: ["./listar-pessoa.component.css"],
})
export class ListarPessoaComponent implements OnInit {
  listaPessoas$: Observable<Pessoa[]> = this.service.listar();

  constructor(private service: PessoaService, private router: Router) {}

  ngOnInit(): void {}

  adicionarPessoa(): void {
    this.router.navigate(["/pessoas/criarPessoa"]);
  }

  editarPessoa(login: string | undefined): void {
    if (login) {
      this.router.navigate([`/pessoas/editarPessoa/${login}`]);
    }
  }

  cancelar(): void {
    this.router.navigate(["/menu"]);
  }
}
