import { BairroCompleto } from "../../bairros/interfaces/BairroCompleto";

export interface EnderecoCompleto {
  codigoEndereco?: number;
  codigoPessoa: number;
  bairro: BairroCompleto;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
}
