/* tslint:disable */
import { ColunaProdutoDTO } from './coluna-produto-dto';
export interface ItemNotaDTO {
  fatorMinimoAceitacao?: number;
  algoritmo?: string;
  colunasProduto?: Array<ColunaProdutoDTO>;
  confiancaPreditiva?: number;
  dataClassificacao?: string;
  cfop?: string;
  itemAssociadoCatalogo?: string;
  itemNota?: string;
  modeloClassificacao?: string;
  modeloClassificacaoId?: number;
  segmento?: string;
}
