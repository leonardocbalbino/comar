/* tslint:disable */
import { ProdutoDTO } from './produto-dto';
import { RegrasDetalheDTO } from './regras-detalhe-dto';
export interface RegraProdutoDTO {
  produto?: ProdutoDTO;
  regraProdutoId?: number;
  regrasDetalhes?: Array<RegrasDetalheDTO>;
}
