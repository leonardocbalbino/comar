import { ColunaProduto } from './coluna-produto';

export interface ItemNota {
  cfop?: string;
  colunasProduto?: ColunaProduto[];
  confiancaPreditiva?: number;
  dataClassificacao?: string;
  fatorMinimoAceitacao?: number;
  itemAssociadoCatalogo?: string;
  modeloClassificacaoId?: number;
  itemNota: string;
  segmento?: string;
  modeloClassificacao?: string;
  algoritmo?: string;
  notaItemId?: number;
}
