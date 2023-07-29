import { Uf } from "../../ufs/interfaces/Uf";

export interface MunicipioCompleto {
  codigoMunicipio?: number;
  uf: Uf;
  nome: string;
  status: number;
}
