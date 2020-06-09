export interface ManutencaoClassificacao {
  cnpjEmitente?: string;
  cnpjDestinatario?: string;
  dataReclassificacao?: Date;
  numeroNfe?: number;
  dataInicioNfe?: Date;
  dataFimNfe?: Date;
  segmentoId: number;
  produtoId: number;
}
