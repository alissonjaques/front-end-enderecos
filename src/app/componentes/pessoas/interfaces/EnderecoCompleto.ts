import { Bairro } from "../../bairros/interfaces/Bairro";
import { Pessoa } from "./Pessoa";

export interface EnderecoCompleto {
  codigoEndereco?: number;
  pessoa: Pessoa;
  bairro: Bairro;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}
