
export interface ClassificacaoRequest {

  cnpjEmitente?: string;
  cnpjDestinatario?: string;
  dataInicioClassificacao?: Date;
  dataFimClassificacao?: Date;
  dataInicioNfe?: Date;
  dataFimNfe?: Date;
  confiancaPeditivaOperadorRelacional?: string;
  confiancaPreditivaValorPercentual?: number;
  segmentoId?: number;
  produtoId?: number;
  fatorAceitacaoOperadorRelacional?: number;
  fatorAceitacaoValorPercentual?: number;
  numeroNota?: number;
  chaveNota?: string;
  notaItemId?: number;
  classificacaoAutoId?: number;

}
