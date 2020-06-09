/* tslint:disable */
import { Produto } from './produto';
import { RegraManual } from './regra-manual';
import { RegrasDetalhe } from './regras-detalhe';
export interface RegraProduto {
  produto?: Produto;
  regraManual?: RegraManual;
  regraProdutoId?: number;
  regrasDetalhes?: Array<RegrasDetalhe>;
}
