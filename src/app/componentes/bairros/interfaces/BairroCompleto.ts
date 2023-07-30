import { Municipio } from "../../municipios/interfaces/Municipio";

export interface BairroCompleto {
  codigoBairro?: number;
  municipio: Municipio;
  nome: string;
  status: number;
}
