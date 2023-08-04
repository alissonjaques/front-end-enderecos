import { Component, OnInit } from "@angular/core";
import { PessoaCompleta } from "../interfaces/PessoaCompleta";
import { Endereco } from "../interfaces/Endereco";
import { Bairro } from "../../bairros/interfaces/Bairro";
import { PessoaService } from "../services/pessoa.service";
import { BairroService } from "../../bairros/services/bairro.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { EnderecoService } from "../services/endereco.service";
import { openErrorDialog } from "src/app/utils/openErrorDialog";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-editar-pessoa",
  templateUrl: "./editar-pessoa.component.html",
  styleUrls: ["./editar-pessoa.component.css"],
})
export class EditarPessoaComponent implements OnInit {
  pessoa: PessoaCompleta = {
    codigoPessoa: 0,
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
    private enderecoService: EnderecoService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bairroService.listar().subscribe((bairros) => {
      this.bairros = bairros;
    });
    const login = this.route.snapshot.paramMap.get("login");
    if (login) {
      this.service.buscarPorLogin(login).subscribe((pessoa) => {
        this.pessoa = pessoa[0];
        if (this.pessoa.codigoPessoa) {
          this.enderecoService
            .buscarPorCodigoPessoa(this.pessoa.codigoPessoa)
            .subscribe((enderecos) => {
              this.enderecos = enderecos;
            });
        }
      });
    }
    console.log(this.pessoa.codigoPessoa);

    console.log(this.enderecos);
  }

  adicionarEndereco() {
    this.codigoEndereco++;
    console.log(this.pessoa.codigoPessoa);
    this.enderecos.push({
      codigoEndereco: this.codigoEndereco,
      codigoPessoa: this.pessoa.codigoPessoa,
      codigoBairro: this.endereco.codigoBairro,
      nomeRua: this.endereco.nomeRua,
      numero: this.endereco.numero,
      complemento: this.endereco.complemento,
      cep: this.endereco.cep,
    });
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
        codigoPessoa: endereco.codigoPessoa,
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
        openErrorDialog(this.dialog, mensagem, status);
      }
    );
  }

  cancelar() {
    this.router.navigate(["/pessoas"]);
  }
}
