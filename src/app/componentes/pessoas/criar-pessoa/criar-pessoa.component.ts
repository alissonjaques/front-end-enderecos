import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from "@angular/core";
import { PessoaCompleta } from "../interfaces/PessoaCompleta";
import { Bairro } from "../../bairros/interfaces/Bairro";
import { PessoaService } from "../services/pessoa.service";
import { BairroService } from "../../bairros/services/bairro.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Endereco } from "../interfaces/Endereco";
import { ModalEnderecoComponent } from "../modal-endereco/modal-endereco.component";
import { openErrorDialog } from "src/app/utils/openErrorDialog";

@Component({
  selector: "app-criar-pessoa",
  templateUrl: "./criar-pessoa.component.html",
  styleUrls: ["./criar-pessoa.component.css"],
})
export class CriarPessoaComponent implements OnInit {
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
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bairroService.listar().subscribe((bairros) => {
      this.bairros = bairros;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalEnderecoComponent, {
      width: "50%",
      hasBackdrop: true,
      data: {
        enderecos: this.enderecos,
        bairros: this.bairros,
        CodigoEndereco: this.codigoEndereco,
      },
    });
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

  criarPessoa() {
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
    this.service.criar(this.pessoa).subscribe({
      next: () => {
        this.router.navigate(["/pessoas"]);
      },
      error: (erro: HttpErrorResponse) => {
        const mensagem = encodeURIComponent(erro.error.mensagem);
        const status = encodeURIComponent(erro.error.status);
        openErrorDialog(this.dialog, mensagem, status);
      },
    });
  }

  cancelar() {
    this.router.navigate(["/pessoas"]);
  }
}
