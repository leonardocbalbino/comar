/* tslint:disable */
import { AgrupamentoModeloAuto } from './agrupamento-modelo-auto';
import { AgrupamentoNotaIten } from './agrupamento-nota-iten';
export interface Agrupamento {
  agrupamentoAlias?: string;
  agrupamentoData?: string;
  agrupamentoId?: number;
  agrupamentoModeloAutos?: Array<AgrupamentoModeloAuto>;
  agrupamentoNome?: string;
  agrupamentoNotaItens?: Array<AgrupamentoNotaIten>;
}
