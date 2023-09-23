import { Component, Inject, Input, OnInit } from "@angular/core";
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
  formulario!: FormGroup;
  codigoPessoa: number = 0;

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
    if (this.data && this.data.codigoPessoa) {
      this.codigoPessoa = this.data.codigoPessoa;
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

  adicionarEndereco(): void {
    if (this.formulario.valid) {
      this.enderecos.push({
        codigoPessoa: this.codigoPessoa,
        ...this.formulario.value,
      });
    }
  }

  ngOnInit(): void {}
}
