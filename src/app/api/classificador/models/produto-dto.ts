/* tslint:disable */
import { ColunaProdutoDTO } from './coluna-produto-dto';
import { ItemClassificacaoManualDTO } from './item-classificacao-manual-dto';
import { HierarquiaDTO } from './hierarquia-dto';
export interface ProdutoDTO {
  produtoId?: number;
  colunaProdutos?: Array<ColunaProdutoDTO>;
  itemClassificacaoManuals?: Array<ItemClassificacaoManualDTO>;
  produtoFatorAceitacao?: number;
  produtoFimVigencia?: string;
  hierarquias?: Array<HierarquiaDTO>;
  produtoInicioVigencia?: string;
  produtoTipoProduto?: string;
  produtoValorMaximo?: number;
  produtoValorMedio?: number;
  produtoValorMinimo?: number;
  hierarquiaNome?: string;
  catalogoNome?: string;
  produtoNome?: string;
  descricaoTipoProduto?: string;
}
