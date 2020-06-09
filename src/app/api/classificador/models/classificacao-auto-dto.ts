/* tslint:disable */
import { ItemNotaDTO } from './item-nota-dto';
export interface ClassificacaoAutoDTO {
  itemNota?: ItemNotaDTO;
  chaveNota?: string;
  cnpjEmitente?: string;
  dataNota?: string;
  destinatario?: string;
  emitente?: string;
  cnpjCpfDestinatario?: string;
  naturezaOperacao?: string;
  numeroNota?: number;
  produtoId?: number;
  ufDestinatario?: string;
  ufEmitente?: string;
}
