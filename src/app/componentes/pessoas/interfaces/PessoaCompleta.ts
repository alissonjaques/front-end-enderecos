import { Endereco } from "./Endereco";

export interface PessoaCompleta {
  codigoPessoa?: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}
