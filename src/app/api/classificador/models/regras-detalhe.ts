/* tslint:disable */
import { Atributo } from './atributo';
import { RegraProduto } from './regra-produto';
export interface RegrasDetalhe {
  atributo?: Atributo;
  regraProduto?: RegraProduto;
  regrasDetalheCondicao?: string;
  regrasDetalheId?: number;
  regrasDetalheOperRelacional?: string;
  regrasDetalheOperadorLogico?: string;
}
