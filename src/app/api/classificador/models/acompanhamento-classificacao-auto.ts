import { ItemNota } from './item-nota';

export interface AcompanhamentoClassificacaoAuto {
  chaveNota?: string;
  cnpjCpfDestinatario?: string;
  cnpjEmitente?: string;
  dataNota?: Date;
  destinatario?: string;
  emitente?: string;
  itemNota?: ItemNota;
  naturezaOperacao?: string;
  numeroNota?: number;
  produtoId?: number;
  ufDestinatario?: string;
  ufEmitente?: string;
  produtoClassificacaoAutoId?: number;
  classificacaoAutoId?: number;
  confiancaPreditiva?: number;
  itemNotaFiscal?: string;
  descricaoTipoProduto?: string;
}
