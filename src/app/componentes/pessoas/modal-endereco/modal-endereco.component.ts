import { Component, Inject, OnInit } from "@angular/core";
import { Endereco } from "../interfaces/Endereco";
import { Bairro } from "../../bairros/interfaces/Bairro";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-modal-endereco",
  templateUrl: "./modal-endereco.component.html",
  styleUrls: ["./modal-endereco.component.css"],
})
export class ModalEnderecoComponent implements OnInit {
  enderecos: Endereco[] = [];
  bairros: Bairro[] = [];
  codigoEndereco: number = 0;
  formulario!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) {
    if (this.data && this.data.enderecos) {
      this.enderecos = this.data.enderecos;
    }
    if (this.data && this.data.bairros) {
      this.bairros = this.data.bairros;
    }
    if (this.data && this.data.codigoEndereco) {
      this.codigoEndereco = this.data.codigoEndereco;
    }
    this.formulario = this.formBuilder.group({
      codigoBairro: ["", Validators.compose([Validators.required])],
      nomeRua: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(256),
          Validators.pattern(/(.|\s)*\S(.|\s)*/), // valida se a string não contém apenas espaços vazios
        ]),
      ],
      numero: [
        "",
        Validators.compose([
          Validators.pattern(/^[1-9]\d*$/), // valida se a string representa um número inteiro positivo
          Validators.compose([Validators.required]),
          Validators.maxLength(10),
        ]),
      ],
      complemento: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],
      cep: [
        "",
        Validators.compose([
          Validators.pattern(/^\d{5}-?\d{3}$/), // valida se a string representa um CEP válido
          Validators.required,
          Validators.maxLength(10),
        ]),
      ],
    });
  }

  adicionarEndereco() {
    if (this.formulario.valid) {
      this.codigoEndereco++;
      this.enderecos.push({
        codigoEndereco: this.codigoEndereco,
        codigoBairro: this.formulario.value.codigoBairro,
        nomeRua: this.formulario.value.nomeRua,
        numero: this.formulario.value.numero,
        complemento: this.formulario.value.complemento,
        cep: this.formulario.value.cep,
      });
    }
  }

  ngOnInit(): void {}
}
