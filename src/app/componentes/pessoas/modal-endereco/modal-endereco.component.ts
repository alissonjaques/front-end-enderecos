import { Component, Inject, OnInit } from "@angular/core";
import { Endereco } from "../interfaces/Endereco";
import { Bairro } from "../../bairros/interfaces/Bairro";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-modal-endereco",
  templateUrl: "./modal-endereco.component.html",
  styleUrls: ["./modal-endereco.component.css"],
})
export class ModalEnderecoComponent implements OnInit {
  enderecos: Endereco[] = [];
  bairros: Bairro[] = [];
  codigoEndereco: number = 0;

  endereco: Endereco = {
    codigoBairro: 0,
    nomeRua: "",
    numero: "",
    complemento: "",
    cep: "",
  };

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    if (this.data && this.data.enderecos) {
      this.enderecos = this.data.enderecos;
    }
    if (this.data && this.data.bairros) {
      this.bairros = this.data.bairros;
    }
    if (this.data && this.data.codigoEndereco) {
      this.codigoEndereco = this.data.codigoEndereco;
    }
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

  ngOnInit(): void {}
}
