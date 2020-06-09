export default interface ItemClassificacaoManualResponse {

  itemClassificacaoManualId?: number;
  numeroNota?: number;
  dataNota?: Date;
  segmento?: string;
  atributoAlvo?: string;
  dataReclassificacao?: Date;
  cnpjEmitente?: string;
  cnpjDestinatario?: string;
  ncm?: number;
  valorUnitario?: number;
  usuarioReclassificacao?: string;
  itemNotaFiscal?: string;
  produtoSugerido?: string;
  produtoAssociado?: string;
  classificacaoAutoId?: number;
  notaItemId?: number;
  confiancaPreditiva?: number;
  tipoProduto?: string;
  descricaoTipoProduto?: string;
  produtoId?: number;
  modeloId?: number;
}
