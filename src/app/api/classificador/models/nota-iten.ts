/* tslint:disable */
import { AgrupamentoNotaIten } from './agrupamento-nota-iten';
import { ClassificacaoAuto } from './classificacao-auto';
import { ItemClassificacaoManual } from './item-classificacao-manual';
import { NfeProduto } from './nfe-produto';
export interface NotaIten {
  agrupamentoNotaItens?: Array<AgrupamentoNotaIten>;
  classificacaoAutos?: Array<ClassificacaoAuto>;
  itemClassificacaoManuals?: Array<ItemClassificacaoManual>;
  nfeProduto?: NfeProduto;
  notasItensId?: number;
}
