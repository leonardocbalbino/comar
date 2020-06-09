/* tslint:disable */
import { ConfigAgente } from './config-agente';
import { ItemClassificacaoManual } from './item-classificacao-manual';
import { ModelosAuto } from './modelos-auto';
import { NotaIten } from './nota-iten';
import { ProdutoClassificacaoAuto } from './produto-classificacao-auto';
export interface ClassificacaoAuto {
  classificacaoAutoAceita?: number;
  classificacaoAutoData?: string;
  classificacaoAutoId?: number;
  classificacaoAutoOrigem?: number;
  classificacaoAutoPrecisao?: number;
  configAgente?: ConfigAgente;
  itemClassificacaoManuals?: Array<ItemClassificacaoManual>;
  modelosAuto?: ModelosAuto;
  notaIten?: NotaIten;
  produtoClassificacaoAutos?: Array<ProdutoClassificacaoAuto>;
}
