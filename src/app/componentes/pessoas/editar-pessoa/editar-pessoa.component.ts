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
import { ModalEnderecoComponent } from "../modal-endereco/modal-endereco.component";

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

  bairros: Bairro[] = [];
  enderecos: Endereco[] = [];
  codigoPessoa!: number;

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
          this.codigoPessoa = this.pessoa.codigoPessoa;
          this.enderecoService
            .buscarPorCodigoPessoa(this.pessoa.codigoPessoa)
            .subscribe((enderecos) => {
              this.enderecos = enderecos;
            });
        }
      });
    }
  }

  openDialog(): void {
    this.dialog.open(ModalEnderecoComponent, {
      width: "50%",
      hasBackdrop: true,
      data: {
        enderecos: this.enderecos,
        bairros: this.bairros,
        codigoPessoa: this.codigoPessoa,
      },
    });
  }

  adicionarEndereco(): void {
    this.enderecos.push({
      codigoPessoa: this.pessoa.codigoPessoa,
      ...this.endereco,
    });
  }

  removerEndereco(codigoEndereco: number | undefined): void {
    if (codigoEndereco) {
      const index = this.enderecos.findIndex(
        (endereco) => endereco.codigoEndereco == codigoEndereco
      );

      if (index !== -1) {
        this.enderecos.splice(index, 1);
      }
    }
  }

  editarPessoa(): void {
    this.pessoa.status = Number(this.pessoa.status);
    this.pessoa.enderecos = this.enderecos;
    this.service.editar(this.pessoa).subscribe({
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

  cancelar(): void {
    this.router.navigate(["/pessoas"]);
  }
}
