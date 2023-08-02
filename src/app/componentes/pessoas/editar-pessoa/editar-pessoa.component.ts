import { Component, OnInit } from "@angular/core";
import { PessoaCompleta } from "../interfaces/PessoaCompleta";
import { Endereco } from "../interfaces/Endereco";
import { Bairro } from "../../bairros/interfaces/Bairro";
import { PessoaService } from "../services/pessoa.service";
import { BairroService } from "../../bairros/services/bairro.service";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-editar-pessoa",
  templateUrl: "./editar-pessoa.component.html",
  styleUrls: ["./editar-pessoa.component.css"],
})
export class EditarPessoaComponent implements OnInit {
  pessoa: PessoaCompleta = {
    nome: "",
    sobrenome: "",
    idade: 0,
    login: "",
    senha: "",
    status: 0,
    enderecos: [],
  };

  endereco: Endereco = {
    codigoBairro: 0,
    nomeRua: "",
    numero: "",
    complemento: "",
    cep: "",
  };

  codigoEndereco: number = 0;

  bairros: Bairro[] = [];
  enderecos: Endereco[] = [];

  constructor(
    private service: PessoaService,
    private bairroService: BairroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bairroService.listar().subscribe((bairros) => {
      this.bairros = bairros;
    });
    const login = this.route.snapshot.paramMap.get("login");
    if (login) {
      this.service.buscarPorLogin(login).subscribe((pessoa) => {
        this.pessoa = pessoa[0];
      });
    }
    console.log(this.pessoa);
  }

  adicionarEndereco() {
    this.codigoEndereco++;
    this.enderecos.push({
      codigoEndereco: this.codigoEndereco,
      codigoBairro: this.endereco.codigoBairro,
      nomeRua: this.endereco.nomeRua,
      numero: this.endereco.numero,
      complemento: this.endereco.complemento,
      cep: this.endereco.cep,
    });
    console.log(this.enderecos);
  }

  removerEndereco(codigoEndereco: number | undefined) {
    if (codigoEndereco) {
      const index = this.enderecos.findIndex(
        (endereco) => endereco.codigoEndereco == codigoEndereco
      );

      if (index !== -1) {
        this.enderecos.splice(index, 1);
      }
    }
  }

  editarPessoa() {
    this.pessoa.status = Number(this.pessoa.status);
    this.pessoa.enderecos = this.enderecos.map((endereco) => {
      return {
        codigoBairro: endereco.codigoBairro,
        nomeRua: endereco.nomeRua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        cep: endereco.cep,
      };
    });
    this.service.editar(this.pessoa).subscribe(
      () => {
        this.router.navigate(["/pessoas"]);
      },
      (error: HttpErrorResponse) => {
        const mensagem = encodeURIComponent(error.error.mensagem);
        const status = encodeURIComponent(error.error.status);
        const url = `/pessoas/editarPessoa/${this.pessoa.login}`;
        const parametros: NavigationExtras = {
          queryParams: { mensagem: mensagem, status: status, url: url },
        };
        this.router.navigate([`/erro`], parametros);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/pessoas"]);
  }
}
