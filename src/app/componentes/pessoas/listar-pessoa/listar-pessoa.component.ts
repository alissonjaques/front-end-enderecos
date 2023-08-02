import { Component, OnInit } from "@angular/core";
import { Pessoa } from "../interfaces/Pessoa";
import { PessoaService } from "../services/pessoa.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-listar-pessoa",
  templateUrl: "./listar-pessoa.component.html",
  styleUrls: ["./listar-pessoa.component.css"],
})
export class ListarPessoaComponent implements OnInit {
  listaPessoas: Pessoa[] = [];

  constructor(private service: PessoaService, private router: Router) {}

  ngOnInit(): void {
    this.service.listar().subscribe((listaPessoas) => {
      this.listaPessoas = listaPessoas;
    });
  }

  adicionarPessoa() {
    this.router.navigate(["/pessoas/criarPessoa"]);
  }

  editarPessoa(login: string | undefined) {
    if (login) {
      this.router.navigate([`/pessoas/editarPessoa/${login}`]);
    }
  }

  cancelar() {
    this.router.navigate(["/menu"]);
  }
}
